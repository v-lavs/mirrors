"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MicroModal = function () {
    'use strict';

    var FOCUSABLE_ELEMENTS = ['a[href]', 'area[href]', 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', 'select:not([disabled]):not([aria-hidden])', 'textarea:not([disabled]):not([aria-hidden])', 'button:not([disabled]):not([aria-hidden])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];

    var Modal =
        /*#__PURE__*/
        function () {
            function Modal(_ref) {
                var targetModal = _ref.targetModal,
                    _ref$triggers = _ref.triggers,
                    triggers = _ref$triggers === void 0 ? [] : _ref$triggers,
                    _ref$onShow = _ref.onShow,
                    onShow = _ref$onShow === void 0 ? function () {} : _ref$onShow,
                    _ref$onClose = _ref.onClose,
                    onClose = _ref$onClose === void 0 ? function () {} : _ref$onClose,
                    _ref$openTrigger = _ref.openTrigger,
                    openTrigger = _ref$openTrigger === void 0 ? 'data-micromodal-trigger' : _ref$openTrigger,
                    _ref$closeTrigger = _ref.closeTrigger,
                    closeTrigger = _ref$closeTrigger === void 0 ? 'data-micromodal-close' : _ref$closeTrigger,
                    _ref$disableScroll = _ref.disableScroll,
                    disableScroll = _ref$disableScroll === void 0 ? false : _ref$disableScroll,
                    _ref$disableFocus = _ref.disableFocus,
                    disableFocus = _ref$disableFocus === void 0 ? false : _ref$disableFocus,
                    _ref$awaitCloseAnimat = _ref.awaitCloseAnimation,
                    awaitCloseAnimation = _ref$awaitCloseAnimat === void 0 ? false : _ref$awaitCloseAnimat,
                    _ref$awaitOpenAnimati = _ref.awaitOpenAnimation,
                    awaitOpenAnimation = _ref$awaitOpenAnimati === void 0 ? false : _ref$awaitOpenAnimati,
                    _ref$debugMode = _ref.debugMode,
                    debugMode = _ref$debugMode === void 0 ? false : _ref$debugMode;

                _classCallCheck(this, Modal);

                // Save a reference of the modal
                this.modal = document.getElementById(targetModal); // Save a reference to the passed config

                this.config = {
                    debugMode: debugMode,
                    disableScroll: disableScroll,
                    openTrigger: openTrigger,
                    closeTrigger: closeTrigger,
                    onShow: onShow,
                    onClose: onClose,
                    awaitCloseAnimation: awaitCloseAnimation,
                    awaitOpenAnimation: awaitOpenAnimation,
                    disableFocus: disableFocus
                }; // Register click events only if pre binding eventListeners

                if (triggers.length > 0) this.registerTriggers.apply(this, _toConsumableArray(triggers)); // pre bind functions for event listeners

                this.onClick = this.onClick.bind(this);
                this.onKeydown = this.onKeydown.bind(this);
            }
            /**
             * Loops through all openTriggers and binds click event
             * @param  {array} triggers [Array of node elements]
             * @return {void}
             */


            _createClass(Modal, [{
                key: "registerTriggers",
                value: function registerTriggers() {
                    var _this = this;

                    for (var _len = arguments.length, triggers = new Array(_len), _key = 0; _key < _len; _key++) {
                        triggers[_key] = arguments[_key];
                    }

                    triggers.filter(Boolean).forEach(function (trigger) {
                        trigger.addEventListener('click', function (event) {
                            return _this.showModal(event);
                        });
                    });
                }
            }, {
                key: "showModal",
                value: function showModal() {
                    var _this2 = this;

                    this.activeElement = document.activeElement;
                    this.modal.setAttribute('aria-hidden', 'false');
                    this.modal.classList.add('is-open');
                    this.scrollBehaviour('disable');
                    this.addEventListeners();

                    if (this.config.awaitOpenAnimation) {
                        var handler = function handler() {
                            _this2.modal.removeEventListener('animationend', handler, false);

                            _this2.setFocusToFirstNode();
                        };

                        this.modal.addEventListener('animationend', handler, false);
                    } else {
                        this.setFocusToFirstNode();
                    }

                    this.config.onShow(this.modal, this.activeElement);
                }
            }, {
                key: "closeModal",
                value: function closeModal() {
                    var modal = this.modal;
                    this.modal.setAttribute('aria-hidden', 'true');
                    this.removeEventListeners();
                    this.scrollBehaviour('enable');

                    if (this.activeElement) {
                        this.activeElement.focus();
                    }

                    this.config.onClose(this.modal);

                    if (this.config.awaitCloseAnimation) {
                        this.modal.addEventListener('animationend', function handler() {
                            modal.classList.remove('is-open');
                            modal.removeEventListener('animationend', handler, false);
                        }, false);
                    } else {
                        modal.classList.remove('is-open');
                    }
                }
            }, {
                key: "closeModalById",
                value: function closeModalById(targetModal) {
                    this.modal = document.getElementById(targetModal);
                    if (this.modal) this.closeModal();
                }
            }, {
                key: "scrollBehaviour",
                value: function scrollBehaviour(toggle) {
                    if (!this.config.disableScroll) return;
                    var body = document.querySelector('body');

                    switch (toggle) {
                        case 'enable':
                            Object.assign(body.style, {
                                overflow: '',
                                height: ''
                            });
                            break;

                        case 'disable':
                            Object.assign(body.style, {
                                overflow: 'hidden',
                                height: '100vh'
                            });
                            break;

                        default:
                    }
                }
            }, {
                key: "addEventListeners",
                value: function addEventListeners() {
                    this.modal.addEventListener('touchstart', this.onClick);
                    this.modal.addEventListener('click', this.onClick);
                    document.addEventListener('keydown', this.onKeydown);
                }
            }, {
                key: "removeEventListeners",
                value: function removeEventListeners() {
                    this.modal.removeEventListener('touchstart', this.onClick);
                    this.modal.removeEventListener('click', this.onClick);
                    document.removeEventListener('keydown', this.onKeydown);
                }
            }, {
                key: "onClick",
                value: function onClick(event) {
                    if (event.target.hasAttribute(this.config.closeTrigger)) {
                        this.closeModal();
                        event.preventDefault();
                    }
                }
            }, {
                key: "onKeydown",
                value: function onKeydown(event) {
                    if (event.keyCode === 27) this.closeModal(event);
                    if (event.keyCode === 9) this.maintainFocus(event);
                }
            }, {
                key: "getFocusableNodes",
                value: function getFocusableNodes() {
                    var nodes = this.modal.querySelectorAll(FOCUSABLE_ELEMENTS);
                    return Array.apply(void 0, _toConsumableArray(nodes));
                }
            }, {
                key: "setFocusToFirstNode",
                value: function setFocusToFirstNode() {
                    if (this.config.disableFocus) return;
                    var focusableNodes = this.getFocusableNodes();
                    if (focusableNodes.length) focusableNodes[0].focus();
                }
            }, {
                key: "maintainFocus",
                value: function maintainFocus(event) {
                    var focusableNodes = this.getFocusableNodes(); // if disableFocus is true

                    if (!this.modal.contains(document.activeElement)) {
                        focusableNodes[0].focus();
                    } else {
                        var focusedItemIndex = focusableNodes.indexOf(document.activeElement);

                        if (event.shiftKey && focusedItemIndex === 0) {
                            focusableNodes[focusableNodes.length - 1].focus();
                            event.preventDefault();
                        }

                        if (!event.shiftKey && focusedItemIndex === focusableNodes.length - 1) {
                            focusableNodes[0].focus();
                            event.preventDefault();
                        }
                    }
                }
            }]);

            return Modal;
        }();
    /**
     * Modal prototype ends.
     * Here on code is responsible for detecting and
     * auto binding event handlers on modal triggers
     */
        // Keep a reference to the opened modal


    var activeModal = null;
    /**
     * Generates an associative array of modals and it's
     * respective triggers
     * @param  {array} triggers     An array of all triggers
     * @param  {string} triggerAttr The data-attribute which triggers the module
     * @return {array}
     */

    var generateTriggerMap = function generateTriggerMap(triggers, triggerAttr) {
        var triggerMap = [];
        triggers.forEach(function (trigger) {
            var targetModal = trigger.attributes[triggerAttr].value;
            if (triggerMap[targetModal] === undefined) triggerMap[targetModal] = [];
            triggerMap[targetModal].push(trigger);
        });
        return triggerMap;
    };
    /**
     * Validates whether a modal of the given id exists
     * in the DOM
     * @param  {number} id  The id of the modal
     * @return {boolean}
     */


    var validateModalPresence = function validateModalPresence(id) {
        if (!document.getElementById(id)) {
            console.warn("MicroModal: \u2757Seems like you have missed %c'".concat(id, "'"), 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'ID somewhere in your code. Refer example below to resolve it.');
            console.warn("%cExample:", 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', "<div class=\"modal\" id=\"".concat(id, "\"></div>"));
            return false;
        }
    };
    /**
     * Validates if there are modal triggers present
     * in the DOM
     * @param  {array} triggers An array of data-triggers
     * @return {boolean}
     */


    var validateTriggerPresence = function validateTriggerPresence(triggers) {
        if (triggers.length <= 0) {
            console.warn("MicroModal: \u2757Please specify at least one %c'micromodal-trigger'", 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'data attribute.');
            console.warn("%cExample:", 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', "<a href=\"#\" data-micromodal-trigger=\"my-modal\"></a>");
            return false;
        }
    };
    /**
     * Checks if triggers and their corresponding modals
     * are present in the DOM
     * @param  {array} triggers   Array of DOM nodes which have data-triggers
     * @param  {array} triggerMap Associative array of modals and their triggers
     * @return {boolean}
     */


    var validateArgs = function validateArgs(triggers, triggerMap) {
        validateTriggerPresence(triggers);
        if (!triggerMap) return true;

        for (var id in triggerMap) {
            validateModalPresence(id);
        }

        return true;
    };
    /**
     * Binds click handlers to all modal triggers
     * @param  {object} config [description]
     * @return void
     */


    var init = function init(config) {
        // Create an config object with default openTrigger
        var options = Object.assign({}, {
            openTrigger: 'data-micromodal-trigger'
        }, config); // Collects all the nodes with the trigger

        var triggers = _toConsumableArray(document.querySelectorAll("[".concat(options.openTrigger, "]"))); // Makes a mappings of modals with their trigger nodes


        var triggerMap = generateTriggerMap(triggers, options.openTrigger); // Checks if modals and triggers exist in dom

        if (options.debugMode === true && validateArgs(triggers, triggerMap) === false) return; // For every target modal creates a new instance

        for (var key in triggerMap) {
            var value = triggerMap[key];
            options.targetModal = key;
            options.triggers = _toConsumableArray(value);
            activeModal = new Modal(options); // eslint-disable-line no-new
        }
    };
    /**
     * Shows a particular modal
     * @param  {string} targetModal [The id of the modal to display]
     * @param  {object} config [The configuration object to pass]
     * @return {void}
     */


    var show = function show(targetModal, config) {
        var options = config || {};
        options.targetModal = targetModal; // Checks if modals and triggers exist in dom

        if (options.debugMode === true && validateModalPresence(targetModal) === false) return; // stores reference to active modal

        activeModal = new Modal(options); // eslint-disable-line no-new

        activeModal.showModal();
    };
    /**
     * Closes the active modal
     * @param  {string} targetModal [The id of the modal to close]
     * @return {void}
     */


    var close = function close(targetModal) {
        targetModal ? activeModal.closeModalById(targetModal) : activeModal.closeModal();
    };

    return {
        init: init,
        show: show,
        close: close
    };
}();