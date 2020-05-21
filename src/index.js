import './index.css';

import {generateID, insertAfter, insertBefore} from './utils.js'
import '../node_modules/element-closest-polyfill';
import '../node_modules/custom-event-polyfill';

export default class ClickNav {
    constructor(element, params = {}) {
        const defaults = {
            menutype : "dropdown",
            animationSpeed : 400,
            menuSelector : '.cm-nav',
            toggleSelector : ".cm-nav__toggle",
            linkSelector : '.cm-nav__link',
            htmlClass: "cm-js-menu-active",
            panelActiveClass: 'cm-nav__sub-menu--active',
            expanderClass: 'cm-nav__expander',            
            expanderText: "expand | collapse",
            createLandingLinks : false,
            separateExpanders: false,
            isAutoClose: true,
            isRTL : false
        };

        this.config = { ...defaults, ...params };
        this.nav = element;
        console.log(this.config);

        this.handleExpander = this.handleExpander.bind(this);
        this.handleKeys = this.handleKeys.bind(this);
        this.handleMenu = this.handleMenu.bind(this);

        this._init();
    }

    _init(){
        const _ = this;
        const availableLinks = _.nav.querySelectorAll(this.config.linkSelector);

        _.nav.dispatchEvent(new CustomEvent("init", { clickNav: _ } ));

        _.nav.setAttribute('data-level', 0);
        _.nav.addEventListener('keydown', _.handleKeys, { passive: true });

        availableLinks.forEach(link => {
            const siblings = _.getSiblings(link);

            siblings.forEach(sibling => {
                if ( sibling instanceof HTMLDivElement || sibling instanceof HTMLOListElement || sibling instanceof HTMLUListElement) {
                    let panelID = sibling.getAttribute('id');

                    if ( ! sibling.getAttribute('data-type') ) {
                        sibling.setAttribute('data-type', _.config.menutype);
                    }

                    if ( ! panelID ) {
                        panelID = generateID('cm-menu-panel-');
                        sibling.setAttribute('id', panelID);
                    }

                    const button = _.createExpander(panelID, link, _.config.expanderClass);

                    button.addEventListener('click', _.handleExpander, { passive:true });
                    sibling.setAttribute('data-level', _.determineLevel(sibling));

                    if (! _.config.separateExpanders ) {
                        link.setAttribute('hidden', '');
                    }

                    if (_.config.createLandingLinks) {
                        //Add in cloning aspect to start of the related sibling
                        //with removal of unique identifiers if included
                    }

                    insertAfter(button, link);

                    return;
                }
            });
        });
    }

    createExpander(panelID, link, expanderClass) {
        const _ = this;
        const linkText = _.config.separateExpanders ?  "" : link.innerText;
        const placeholder = document.createElement('template');
        placeholder.innerHTML = `<button type="button" class="${expanderClass}" aria-expanded="false" aria-label="${linkText} ${this.config.expanderText}" aria-controls="${panelID}">${linkText}</button>`;

        return placeholder.content.firstElementChild;
    }

    destroy() {
        const _ = this;
        const expanders = _.nav.querySelectorAll('[aria-controls]');
        
        _.nav.dispatchEvent(new CustomEvent("destroy", { clickNav: _ } ));
        
        _.nav.removeEventListener('keydown', _.handleKeys);
        expanders.forEach(elem => {
            elem.removeEventListener('click', _.handleExpander);
        });
    }

    determineLevel(elem) {
        const foundLevel = elem.closest('[data-level]');
        return foundLevel ? parseInt(foundLevel.dataset.level, 10) + 1 : 1;
    }

    handleExpander(e) {
        const _ = this;

        //TODO - Determine if should just be toggleExpander since handleExpander currently adds no value
        _.toggleExpander(e.currentTarget);
    }

    handleKeys(e) {
        const _ = this,
              keyPress = e.key,
              openedToggles = _.nav.querySelectorAll('[data-current]'),
              lastToggle = openedToggles[openedToggles.length - 1];

        if (keyPress === "Escape") {
            if (lastToggle) {
                _.toggleExpander(lastToggle);
                lastToggle.focus();
            }
        }
    }

    handleMenu(e) {
        const _ = this;
        if ( ! _.nav.contains(e.target) && e.target !== _.nav ) {
            _.leavingMenu = true;

            _.resetExpanders();
            document.removeEventListener("click", _.handleMenu);

            setTimeout(function(){
                //We now know we have left the menu and are done triggering sub menus
                _.leavingMenu = false;
            }, _.config.animationSpeed);
        }
    }

    getSiblings(elem) {
        const parent = elem.parentNode;
        const children = [...parent.children];

        return children.filter(child => child !== elem);
    }

    resetExpanders(navTree, navItem) {
        const _ = this;
        const activeItems = navTree ? 
                            navTree.querySelectorAll('[aria-expanded="true"]') : 
                            _.nav.querySelectorAll('[aria-expanded="true"]');
        //If there is a navTree supplied only check children inside of the level otherwise close all menus
        activeItems.forEach(button => {
            //Make sure not to call on the button that might be triggering this on open
            if ( button !== navItem ) {
                _.toggleExpander(button);
            }
        });
    }

    toggleExpander(button) {
        const _ = this;
        const panel = document.getElementById(button.getAttribute('aria-controls'));
        const wrapper = button.closest('data-level');

        if (button.getAttribute('aria-expanded') === 'true') {

            _.nav.dispatchEvent(new CustomEvent("before.expander.close", { clickNav: _ } ));

            button.removeAttribute('data-current');
            panel.classList.remove(_.config.panelActiveClass);

            setTimeout(() => {
                button.setAttribute('aria-expanded', false);

                _.nav.dispatchEvent(new CustomEvent("after.expander.close", { clickNav: _ } ));
            }, _.config.animationSpeed)

        } else {
            _.nav.dispatchEvent(new CustomEvent("before.expander.open", { clickNav: _ } ));

            button.setAttribute('aria-expanded', true);
            button.setAttribute('data-current', true);

            _.resetExpanders(button.closest('[data-level]'), button);

            setTimeout(() => {
                panel.classList.add(_.config.panelActiveClass);

                if ( _.config.isAutoClose ) { // Only add if (default) menus set to auto close
                    document.addEventListener('click', _.handleMenu);
                }

                setTimeout(() => {
                    _.nav.dispatchEvent(new CustomEvent("after.expander.open", { clickNav: _ } ));
                }, _.config.animationSpeed);

            }, 10);
        }
    }
}