"use strict";

tutao.provide('tutao.tutanota.ctrl.AdminAliasViewModel');

tutao.tutanota.ctrl.AdminAliasViewModel = function(adminEditUserViewModel) {
    tutao.util.FunctionUtils.bindPrototypeMethodsToThis(this);

    this._editUserViewModel = adminEditUserViewModel;
    this.mailAddressPrefix = ko.observable("");

    this.availableDomains = ko.observableArray(adminEditUserViewModel.adminUserListViewModel.getAvailableDomains());
    this.domain = ko.observable(this.availableDomains()[0]);
    this.mailAddressStatus = ko.observable({ type: "neutral", text: "mailAddressNeutral_msg"});

    this.mailAddress = ko.computed(function() {
        return tutao.tutanota.util.Formatter.getCleanedMailAddress(this.mailAddressPrefix() + "@" + this.domain());
    }, this);

    this.mailAddress.subscribe(this._verifyMailAddressFree, this);

    this.aliasSubmitStatus = ko.observable({ type: "neutral", text: "emptyString_msg" });
    this.inputEnabled = ko.observable(false);

    this.maxNbrOfAliases = ko.observable(null);


    var self = this;
    tutao.entity.sys.MailAddressAliasServiceReturn.load({}, null).then(function(mailAddressAliasServiceReturn) {
        self.maxNbrOfAliases(mailAddressAliasServiceReturn.getNbrOfFreeAliases());
        if (self.maxNbrOfAliases() <= self._editUserViewModel.userGroupInfo.getMailAddressAliases().length) {
            self.mailAddressStatus({ type: "neutral", text: "adminMaxNbrOfAliasesReached_msg"});
        } else if (adminEditUserViewModel.isActive()) {
            self.inputEnabled(true);
        }
    });

    this.aliasList = ko.observableArray();
    for( var i=0; i<this._editUserViewModel.userGroupInfo.getMailAddressAliases().length; i++ ){
        var emailAlias = this._editUserViewModel.userGroupInfo.getMailAddressAliases()[i];
        this.aliasList.push( {emailAddress : emailAlias.getMailAddress(), enabled: ko.observable(emailAlias.getEnabled()) } );
    }
};


tutao.tutanota.ctrl.AdminAliasViewModel.prototype._verifyMailAddressFree = function(cleanedValue) {
    var self = this;
    if (!cleanedValue || self.mailAddressPrefix().trim().length < tutao.tutanota.ctrl.RegistrationViewModel.MINIMUM_MAIL_ADDRESS_PREFIX_LENGTH
        && tutao.entity.tutanota.TutanotaConstants.TUTANOTA_MAIL_ADDRESS_DOMAINS.indexOf(self.domain()) != -1) {
        self.mailAddressStatus({ type: "invalid", text: "mailAddressInvalid_msg"});
        return;
    } else if (!tutao.tutanota.util.Formatter.isMailAddress(cleanedValue)) {
        self.mailAddressStatus({ type: "invalid", text: "mailAddressInvalid_msg"});
        return;
    }

    self.mailAddressStatus({ type: "invalid", text: "mailAddressBusy_msg"});

    setTimeout(function() {
        if (self.mailAddress() == cleanedValue) {
            tutao.entity.sys.DomainMailAddressAvailabilityReturn.load(new tutao.entity.sys.DomainMailAddressAvailabilityData().setMailAddress(cleanedValue), [], tutao.entity.EntityHelper.createAuthHeaders()).then(function(domainMailAddressAvailabilityReturn) {
                if (self.mailAddress() == cleanedValue) {
                    if (domainMailAddressAvailabilityReturn.getAvailable()) {
                        self.mailAddressStatus({ type: "valid", text: "mailAddressAvailable_msg"});
                    } else {
                        self.mailAddressStatus({ type: "invalid", text: "mailAddressNA_msg"});
                    }
                }
            });
        }
    }, 500);
};

/**
 * Provides the information if the user may press the confirm button.
 * @return {boolean} True if the button can be presse, false otherwise.
 */
tutao.tutanota.ctrl.AdminAliasViewModel.prototype.confirmPossible = function() {
    return this.inputEnabled() && this.mailAddressStatus().type == "valid";
};

/**
 * Called when the confirm button is clicked by the user.
 */
tutao.tutanota.ctrl.AdminAliasViewModel.prototype.confirm = function() {
    if (!this.confirmPossible()) {
        return;
    }

    this.inputEnabled(false);
    this.aliasSubmitStatus({ type: "neutral", text: "pleaseWait_msg" });

    var self = this;
    var service = new tutao.entity.sys.MailAddressAliasServiceData();

    service.setGroup(this._editUserViewModel.userGroupInfo.getGroup())
        .setMailAddress(this.mailAddress());
    service.setup({}, null).then(function() {
        self.aliasList.push( {emailAddress : self.mailAddress(), enabled: ko.observable(true) } );
        self.aliasSubmitStatus({ type: "valid", text: "finished_msg" });
    }).caught(tutao.InvalidDataError, function(error) {
        self.aliasSubmitStatus({ type: "invalid", text: "mailAddressNA_msg" });
    }).caught(tutao.LimitReachedError, function(error) {
        self.aliasSubmitStatus({ type: "invalid", text: "adminMaxNbrOfAliasesReached_msg" });
    });
};

/**
 *
 */
tutao.tutanota.ctrl.AdminAliasViewModel.prototype.deleteAlias = function(aliasListElement) {
    var self = this;

    var restore = true;
    var promise = Promise.resolve(true);
    if (aliasListElement.enabled()){
        restore = false;
        var message = tutao.tutanota.util.Formatter.isTutanotaMailAddress(aliasListElement.emailAddress) ? 'deactivateAlias_msg' : 'deleteAlias_msg';
        promise = tutao.tutanota.gui.confirm(tutao.lang(message, { "{1}" : aliasListElement.emailAddress} ));
    }
    promise.then(function(confirmed){
        if(confirmed){
            var deleteData = new tutao.entity.sys.MailAddressAliasServiceDataDelete();
            deleteData.setMailAddress(aliasListElement.emailAddress);
            deleteData.setRestore(restore);
            deleteData.setGroup(self._editUserViewModel.userGroupInfo.getGroup());
            deleteData.erase({}, null).then(function() {
                // update alias status for tutanota addresses
                if (tutao.tutanota.util.Formatter.isTutanotaMailAddress(aliasListElement.emailAddress)){
                    aliasListElement.enabled(restore);
                } else { // remove alias for custom domain addresses
                    self.aliasList.remove(aliasListElement);
                }
            });
        }
    });
};

tutao.tutanota.ctrl.AdminAliasViewModel.prototype.getDeleteAliasTextId = function(aliasListElement) {
    var self = this;
    if (aliasListElement.enabled()){
        if ( tutao.tutanota.util.Formatter.isTutanotaMailAddress(aliasListElement.emailAddress)){
            return 'deactivate_action';
        }else {
            return 'delete_action';
        }
    } else {
        return 'activate_action';
    }
};


tutao.tutanota.ctrl.AdminAliasViewModel.prototype.getAliasStatusType = function(aliasListElement) {
    return aliasListElement.enabled() ? "valid" : "invalid";
};


tutao.tutanota.ctrl.AdminAliasViewModel.prototype.getAliasStatusText = function(aliasListElement) {
    return aliasListElement.enabled() ? "activated_label" : "deactivated_label";
};


