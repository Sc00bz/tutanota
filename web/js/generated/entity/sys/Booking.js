"use strict";

tutao.provide('tutao.entity.sys.Booking');

/**
 * @constructor
 * @param {Object=} data The json data to store in this entity.
 */
tutao.entity.sys.Booking = function(data) {
  if (data) {
    this.updateData(data);
  } else {
    this.__area = null;
    this.__format = "0";
    this.__id = null;
    this.__owner = null;
    this.__permissions = null;
    this._business = null;
    this._createDate = null;
    this._endDate = null;
    this._paymentInterval = null;
    this._paymentMonths = null;
    this._items = [];
  }
  this._entityHelper = new tutao.entity.EntityHelper(this);
  this.prototype = tutao.entity.sys.Booking.prototype;
};

/**
 * Updates the data of this entity.
 * @param {Object=} data The json data to store in this entity.
 */
tutao.entity.sys.Booking.prototype.updateData = function(data) {
  this.__area = data._area;
  this.__format = data._format;
  this.__id = data._id;
  this.__owner = data._owner;
  this.__permissions = data._permissions;
  this._business = data.business;
  this._createDate = data.createDate;
  this._endDate = data.endDate;
  this._paymentInterval = data.paymentInterval;
  this._paymentMonths = data.paymentMonths;
  this._items = [];
  for (var i=0; i < data.items.length; i++) {
    this._items.push(new tutao.entity.sys.BookingItem(this, data.items[i]));
  }
};

/**
 * The version of the model this type belongs to.
 * @const
 */
tutao.entity.sys.Booking.MODEL_VERSION = '12';

/**
 * The url path to the resource.
 * @const
 */
tutao.entity.sys.Booking.PATH = '/rest/sys/booking';

/**
 * The id of the root instance reference.
 * @const
 */
tutao.entity.sys.Booking.ROOT_INSTANCE_ID = 'A3N5cwACxQ';

/**
 * The generated id type flag.
 * @const
 */
tutao.entity.sys.Booking.GENERATED_ID = true;

/**
 * The encrypted flag.
 * @const
 */
tutao.entity.sys.Booking.prototype.ENCRYPTED = false;

/**
 * Provides the data of this instances as an object that can be converted to json.
 * @return {Object} The json object.
 */
tutao.entity.sys.Booking.prototype.toJsonData = function() {
  return {
    _area: this.__area, 
    _format: this.__format, 
    _id: this.__id, 
    _owner: this.__owner, 
    _permissions: this.__permissions, 
    business: this._business, 
    createDate: this._createDate, 
    endDate: this._endDate, 
    paymentInterval: this._paymentInterval, 
    paymentMonths: this._paymentMonths, 
    items: tutao.entity.EntityHelper.aggregatesToJsonData(this._items)
  };
};

/**
 * The id of the Booking type.
 */
tutao.entity.sys.Booking.prototype.TYPE_ID = 709;

/**
 * The id of the _area attribute.
 */
tutao.entity.sys.Booking.prototype._AREA_ATTRIBUTE_ID = 715;

/**
 * The id of the _owner attribute.
 */
tutao.entity.sys.Booking.prototype._OWNER_ATTRIBUTE_ID = 714;

/**
 * The id of the business attribute.
 */
tutao.entity.sys.Booking.prototype.BUSINESS_ATTRIBUTE_ID = 720;

/**
 * The id of the createDate attribute.
 */
tutao.entity.sys.Booking.prototype.CREATEDATE_ATTRIBUTE_ID = 716;

/**
 * The id of the endDate attribute.
 */
tutao.entity.sys.Booking.prototype.ENDDATE_ATTRIBUTE_ID = 718;

/**
 * The id of the paymentInterval attribute.
 */
tutao.entity.sys.Booking.prototype.PAYMENTINTERVAL_ATTRIBUTE_ID = 719;

/**
 * The id of the paymentMonths attribute.
 */
tutao.entity.sys.Booking.prototype.PAYMENTMONTHS_ATTRIBUTE_ID = 717;

/**
 * The id of the items attribute.
 */
tutao.entity.sys.Booking.prototype.ITEMS_ATTRIBUTE_ID = 721;

/**
 * Provides the id of this Booking.
 * @return {Array.<string>} The id of this Booking.
 */
tutao.entity.sys.Booking.prototype.getId = function() {
  return this.__id;
};

/**
 * Sets the area of this Booking.
 * @param {string} area The area of this Booking.
 */
tutao.entity.sys.Booking.prototype.setArea = function(area) {
  this.__area = area;
  return this;
};

/**
 * Provides the area of this Booking.
 * @return {string} The area of this Booking.
 */
tutao.entity.sys.Booking.prototype.getArea = function() {
  return this.__area;
};

/**
 * Sets the format of this Booking.
 * @param {string} format The format of this Booking.
 */
tutao.entity.sys.Booking.prototype.setFormat = function(format) {
  this.__format = format;
  return this;
};

/**
 * Provides the format of this Booking.
 * @return {string} The format of this Booking.
 */
tutao.entity.sys.Booking.prototype.getFormat = function() {
  return this.__format;
};

/**
 * Sets the owner of this Booking.
 * @param {string} owner The owner of this Booking.
 */
tutao.entity.sys.Booking.prototype.setOwner = function(owner) {
  this.__owner = owner;
  return this;
};

/**
 * Provides the owner of this Booking.
 * @return {string} The owner of this Booking.
 */
tutao.entity.sys.Booking.prototype.getOwner = function() {
  return this.__owner;
};

/**
 * Sets the permissions of this Booking.
 * @param {string} permissions The permissions of this Booking.
 */
tutao.entity.sys.Booking.prototype.setPermissions = function(permissions) {
  this.__permissions = permissions;
  return this;
};

/**
 * Provides the permissions of this Booking.
 * @return {string} The permissions of this Booking.
 */
tutao.entity.sys.Booking.prototype.getPermissions = function() {
  return this.__permissions;
};

/**
 * Sets the business of this Booking.
 * @param {boolean} business The business of this Booking.
 */
tutao.entity.sys.Booking.prototype.setBusiness = function(business) {
  this._business = business ? '1' : '0';
  return this;
};

/**
 * Provides the business of this Booking.
 * @return {boolean} The business of this Booking.
 */
tutao.entity.sys.Booking.prototype.getBusiness = function() {
  return this._business != '0';
};

/**
 * Sets the createDate of this Booking.
 * @param {Date} createDate The createDate of this Booking.
 */
tutao.entity.sys.Booking.prototype.setCreateDate = function(createDate) {
  this._createDate = String(createDate.getTime());
  return this;
};

/**
 * Provides the createDate of this Booking.
 * @return {Date} The createDate of this Booking.
 */
tutao.entity.sys.Booking.prototype.getCreateDate = function() {
  if (isNaN(this._createDate)) {
    throw new tutao.InvalidDataError('invalid time data: ' + this._createDate);
  }
  return new Date(Number(this._createDate));
};

/**
 * Sets the endDate of this Booking.
 * @param {Date} endDate The endDate of this Booking.
 */
tutao.entity.sys.Booking.prototype.setEndDate = function(endDate) {
  if (endDate == null) {
    this._endDate = null;
  } else {
    this._endDate = String(endDate.getTime());
  }
  return this;
};

/**
 * Provides the endDate of this Booking.
 * @return {Date} The endDate of this Booking.
 */
tutao.entity.sys.Booking.prototype.getEndDate = function() {
  if (this._endDate == null) {
    return null;
  }
  if (isNaN(this._endDate)) {
    throw new tutao.InvalidDataError('invalid time data: ' + this._endDate);
  }
  return new Date(Number(this._endDate));
};

/**
 * Sets the paymentInterval of this Booking.
 * @param {string} paymentInterval The paymentInterval of this Booking.
 */
tutao.entity.sys.Booking.prototype.setPaymentInterval = function(paymentInterval) {
  this._paymentInterval = paymentInterval;
  return this;
};

/**
 * Provides the paymentInterval of this Booking.
 * @return {string} The paymentInterval of this Booking.
 */
tutao.entity.sys.Booking.prototype.getPaymentInterval = function() {
  return this._paymentInterval;
};

/**
 * Sets the paymentMonths of this Booking.
 * @param {string} paymentMonths The paymentMonths of this Booking.
 */
tutao.entity.sys.Booking.prototype.setPaymentMonths = function(paymentMonths) {
  this._paymentMonths = paymentMonths;
  return this;
};

/**
 * Provides the paymentMonths of this Booking.
 * @return {string} The paymentMonths of this Booking.
 */
tutao.entity.sys.Booking.prototype.getPaymentMonths = function() {
  return this._paymentMonths;
};

/**
 * Provides the items of this Booking.
 * @return {Array.<tutao.entity.sys.BookingItem>} The items of this Booking.
 */
tutao.entity.sys.Booking.prototype.getItems = function() {
  return this._items;
};

/**
 * Loads a Booking from the server.
 * @param {Array.<string>} id The id of the Booking.
 * @return {Promise.<tutao.entity.sys.Booking>} Resolves to the Booking or an exception if the loading failed.
 */
tutao.entity.sys.Booking.load = function(id) {
  return tutao.locator.entityRestClient.getElement(tutao.entity.sys.Booking, tutao.entity.sys.Booking.PATH, id[1], id[0], {"v" : 12}, tutao.entity.EntityHelper.createAuthHeaders()).then(function(entity) {
    return entity;
  });
};

/**
 * Loads multiple Bookings from the server.
 * @param {Array.<Array.<string>>} ids The ids of the Bookings to load.
 * @return {Promise.<Array.<tutao.entity.sys.Booking>>} Resolves to an array of Booking or rejects with an exception if the loading failed.
 */
tutao.entity.sys.Booking.loadMultiple = function(ids) {
  return tutao.locator.entityRestClient.getElements(tutao.entity.sys.Booking, tutao.entity.sys.Booking.PATH, ids, {"v": 12}, tutao.entity.EntityHelper.createAuthHeaders()).then(function(entities) {
    return entities;
  });
};

/**
 * Stores Booking on the server and updates this instance with _id and _permission values generated on the server.
 * @param {string} listId The list id of the Booking.
 * @return {Promise.<>} Resolves when finished, rejected if the post failed.
 */
tutao.entity.sys.Booking.prototype.setup = function(listId) {
  var self = this;
  self._entityHelper.notifyObservers(false);
  return tutao.locator.entityRestClient.postElement(tutao.entity.sys.Booking.PATH, self, listId, {"v": 12}, tutao.entity.EntityHelper.createAuthHeaders()).then(function(entity) {
      self.__id = [listId, entity.getGeneratedId()];
      self.setPermissions(entity.getPermissionListId());
  });
};

/**
 * Updates the listEncSessionKey on the server.
 * @return {Promise.<>} Resolves when finished, rejected if the update failed.
 */
tutao.entity.sys.Booking.prototype.updateListEncSessionKey = function() {
  var params = {};
  params[tutao.rest.ResourceConstants.UPDATE_LIST_ENC_SESSION_KEY] = "true";
  params["v"] = 12;
  return tutao.locator.entityRestClient.putElement(tutao.entity.sys.Booking.PATH, this, params, tutao.entity.EntityHelper.createAuthHeaders());
};

/**
 * Updates this Booking on the server.
 * @return {Promise.<>} Resolves when finished, rejected if the update failed.
 */
tutao.entity.sys.Booking.prototype.update = function() {
  var self = this;
  return tutao.locator.entityRestClient.putElement(tutao.entity.sys.Booking.PATH, this, {"v": 12}, tutao.entity.EntityHelper.createAuthHeaders()).then(function() {
    self._entityHelper.notifyObservers(false);
  });
};

/**
 * Deletes this Booking on the server.
 * @return {Promise.<>} Resolves when finished, rejected if the delete failed.
 */
tutao.entity.sys.Booking.prototype.erase = function() {
  var self = this;
  return tutao.locator.entityRestClient.deleteElement(tutao.entity.sys.Booking.PATH, this.__id[1], this.__id[0], {"v": 12}, tutao.entity.EntityHelper.createAuthHeaders()).then(function(data) {
    self._entityHelper.notifyObservers(true);
  });
};

/**
 * Creates a new Booking list on the server.
 * @param {tutao.entity.BucketData} bucketData The bucket data for which the share permission on the list shall be created.
 * @return {Promise.<string=>} Resolves to the id of the new tutao.entity.sys.Booking list or rejects with an exception if the createList failed.
 */
tutao.entity.sys.Booking.createList = function(bucketData) {
  var params = tutao.entity.EntityHelper.createPostListPermissionMap(bucketData, false);
  params["v"] = 12;
  return tutao.locator.entityRestClient.postList(tutao.entity.sys.Booking.PATH, params, tutao.entity.EntityHelper.createAuthHeaders()).then(function(returnEntity) {
    return returnEntity.getGeneratedId();
  });
};

/**
 * Provides a  list of Bookings loaded from the server.
 * @param {string} listId The list id.
 * @param {string} start Start id.
 * @param {number} count Max number of mails.
 * @param {boolean} reverse Reverse or not.
 * @return {Promise.<Array.<tutao.entity.sys.Booking>>} Resolves to an array of Booking or rejects with an exception if the loading failed.
 */
tutao.entity.sys.Booking.loadRange = function(listId, start, count, reverse) {
  return tutao.locator.entityRestClient.getElementRange(tutao.entity.sys.Booking, tutao.entity.sys.Booking.PATH, listId, start, count, reverse, {"v": 12}, tutao.entity.EntityHelper.createAuthHeaders()).then(function(entities) {;
    return entities;
  });
};

/**
 * Register a function that is called as soon as any attribute of the entity has changed. If this listener
 * was already registered it is not registered again.
 * @param {function(Object,*=)} listener. The listener function. When called it gets the entity and the given id as arguments.
 * @param {*=} id. An optional value that is just passed-through to the listener.
 */
tutao.entity.sys.Booking.prototype.registerObserver = function(listener, id) {
  this._entityHelper.registerObserver(listener, id);
};

/**
 * Removes a registered listener function if it was registered before.
 * @param {function(Object)} listener. The listener to unregister.
 */
tutao.entity.sys.Booking.prototype.unregisterObserver = function(listener) {
  this._entityHelper.unregisterObserver(listener);
};
/**
 * Provides the entity helper of this entity.
 * @return {tutao.entity.EntityHelper} The entity helper.
 */
tutao.entity.sys.Booking.prototype.getEntityHelper = function() {
  return this._entityHelper;
};
