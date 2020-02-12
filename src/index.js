import './index.css';

import {generateID, insertAfter, insertBefore} from './utils.js'
import '../node_modules/element-closest-polyfill';
import '../node_modules/custom-event-polyfill';

export default class ClickNav {
    constructor(element, ...params) {
        const defaults = {
            menutype : "dropdown",
            animationSpeed : 400,
            menuSelector : '.cm-nav',
            toggleSelector : ".cm-nav__toggle",
            linkSelector : '.cm-nav__link',
            htmlClass: "cm-js-menu-active",
            expanderClass: 'cm-nav__expander',            
            expanderText: "expand | collapse",
            panelActiveClass: 'cm-nav__sub-menu--active',
            landings : false,
            expanders: false,
            isAutoClose: true,
            isRTL : false
        };

        this.config = { ...defaults, ...params };
        this.element = element;
        console.log(this.config);

        this.handleExpander = this.handleExpander.bind(this);
        this.handleMenu = this.handleMenu.bind(this);

        this.init();
    }

    init(){
        const _ = this;
        const availableLinks = _.element.querySelectorAll(this.config.linkSelector);


        _.element.dispatchEvent(new CustomEvent("init", { clickNav: _ } ));

        availableLinks.forEach(link => {
            const siblings = _.getSiblings(link);

            siblings.forEach(elem => {
                // console.log(elem, elem.nextElementSibling, elem.nextElementSibling && elem.nextElementSibling.nodeType);
                if ( elem instanceof HTMLDivElement || elem instanceof HTMLOListElement || elem instanceof HTMLUListElement) {
                    let panelID = elem.getAttribute('id');

                    if ( ! elem.getAttribute('data-type') ) {
                        elem.setAttribute('data-type', _.config.menutype);
                    }

                    if ( ! panelID ) {
                        panelID = generateID('cm-menu-panel-');
                        elem.setAttribute('id', panelID);
                    } 

                    link.setAttribute('data-has-sub', true);
                    
                    const button = _.createExpander(panelID, link, _.config.expanderClass);

                    insertAfter(button, link);

                    button.addEventListener('click', _.handleExpander);

                    return;
                }
            });

        });
    }

    destroy() {
        const _ = this;
        const expanders = _.element.querySelectorAll('[aria-controls]');
        
        _.element.dispatchEvent(new CustomEvent("destroy", { clickNav: _ } ));

        expanders.forEach(elem => {
            elem.removeEventListener('click', _.handleExpander);
        });        
    }

    createExpander(panelID, link, expanderClass) {
        const _ = this;
        const linkText = _.config.isExpanders ?  "" : link.innerText;
        const placeholder = document.createElement('template');
        placeholder.innerHTML = `<button type="button" class="${expanderClass}" aria-expanded="false" aria-label="${linkText} ${this.config.expanderText}" aria-controls="${panelID}">${linkText}</button>`;

        return placeholder.content.firstElementChild;
    }

    handleExpander(e) {
        const _ = this;
        const button = e.currentTarget;
        _.toggleExpander(button);
    }

    toggleExpander(button) {
        const _ = this;
        const panel = document.getElementById(button.getAttribute('aria-controls'));
        //const wrapper = button.closest('');

        if (button.getAttribute('aria-expanded') === 'true') {

            _.element.dispatchEvent(new CustomEvent("before.expander.close", { clickNav: _ } ));

            panel.classList.remove(_.config.panelActiveClass);

            setTimeout(() => {
                button.setAttribute('aria-expanded', false);

                _.element.dispatchEvent(new CustomEvent("after.expander.close", { clickNav: _ } ));
            }, _.config.animationSpeed)

        } else {
            _.element.dispatchEvent(new CustomEvent("before.expander.open", { clickNav: _ } ));
            button.setAttribute('aria-expanded', true);

            setTimeout(() => {
                panel.classList.add(_.config.panelActiveClass);

                if ( _.config.isAutoClose ) { // Only add if (default) menus set to auto close
                    //.on("touchend click focusin", _.menuHandler);
                    document.addEventListener('click', _.handleMenu)
                }

                setTimeout(() => {
                    _.element.dispatchEvent(new CustomEvent("after.expander.open", { clickNav: _ } ));
                }, _.config.animationSpeed);

            }, 10);
        }
    }

    handleMenu(e) {
        const _ = this;
        console.log('handle menu', _.element.contains(e.target), e.target === _.element, e.target);
        if ( ! _.element.contains(e.target) && e.target !== _.element ) {
            //Make sure not to leave any tabindex=0 on submenu links by making sure the toggle knows we are leaving the menu
            _.leavingMenu = true;

            //_.resetMenus( _.$menu.find(".opened > .has-sub, .opened > .expander-wrap > .has-sub") );

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
    
    resetExpanders() {
        const _ = this;
        const activeItems = _.element.querySelectorAll('[aria-expanded=true]');
        console.log('resetting');
        activeItems.forEach(button => {
            _.toggleExpander(button);
        });
    }
}