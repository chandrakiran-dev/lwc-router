import {createElement} from 'lwc';
import Link from 'c/link';
import {REGISTER_GET_ROUTE_MATCH_EVENT_NAME, REGISTER_ROUTER_EVENT_NAME, RouterWrapper} from 'c/lwcRouterUtil';

afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }
});


describe('when rendering, c-link component', () => {
    it('should update path with parent url if is nested', () => {
        const handler = jest.fn((event) => {
            const callback = event.detail;
            callback({path: '/example-path', url: '/example-path'});
        });
        const element = createElement('c-link', {
            is: Link
        });
        element.to = ':url/nested-path';
        element.addEventListener(REGISTER_GET_ROUTE_MATCH_EVENT_NAME, handler);
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            expect(handler).toHaveBeenCalled();
            expect(element.to).toEqual('/example-path/nested-path');
        });
    });


    it('should not update path if is not nested', () => {
        const handler = jest.fn((event) => {
            const callback = event.detail;
            callback({path: '/example-path', url: '/example-path'});
        });
        const element = createElement('c-link', {
            is: Link
        });
        element.to = '/nested-path';
        element.addEventListener(REGISTER_GET_ROUTE_MATCH_EVENT_NAME, handler);
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            expect(handler).toHaveBeenCalled();
            expect(element.to).toEqual('/nested-path');
        });
    });


    it('should reflect an active attribute when it matches the current path', () => {
        const routerInstance = new RouterWrapper('/example-path');
        const handler = jest.fn((event) => {
            const callback = event.detail;
            callback(routerInstance);
        });
        const element = createElement('c-link', {
            is: Link
        });
        element.addEventListener(REGISTER_ROUTER_EVENT_NAME, handler);
        element.to = '/example-path';
        document.body.appendChild(element);
        return Promise.resolve().then(() => {
            expect(element.hasAttribute('active')).toBe(true);
        });
    });


    it('should not reflect an active attribute when it does not match the current path', () => {
        const routerInstance = new RouterWrapper('/example-path');
        const handler = jest.fn((event) => {
            const callback = event.detail;
            callback(routerInstance);
        });
        const element = createElement('c-link', {
            is: Link
        });
        element.addEventListener(REGISTER_ROUTER_EVENT_NAME, handler);
        element.to = '/a-different-example-path';
        document.body.appendChild(element);
        return Promise.resolve().then(() => {
            expect(element.hasAttribute('active')).toBe(false);
        });
    });


    it('should add the default activeClass to the slotted element when it matches the current path', () => {
        const routerInstance = new RouterWrapper('/example-path');
        const handler = jest.fn((event) => {
            const callback = event.detail;
            callback(routerInstance);
        });
        const element = createElement('c-link', {
            is: Link
        });
        element.addEventListener(REGISTER_ROUTER_EVENT_NAME, handler);
        element.to = '/example-path';

        const slottedElement = document.createElement('div');
        element.appendChild(slottedElement);

        document.body.appendChild(element);
        expect(slottedElement.classList.contains('link-active-class')).toBe(false);

        return Promise.resolve().then(() => {
            expect(slottedElement.classList.contains('link-active-class')).toBe(true);
        });
    });


    it('should not add the default activeClass to the slotted element when it does not match the current path', () => {
        const routerInstance = new RouterWrapper('/example-path');
        const handler = jest.fn((event) => {
            const callback = event.detail;
            callback(routerInstance);
        });
        const element = createElement('c-link', {
            is: Link
        });
        element.addEventListener(REGISTER_ROUTER_EVENT_NAME, handler);
        element.to = '/a-different-example-path';

        const slottedElement = document.createElement('div');
        element.appendChild(slottedElement);
        expect(slottedElement.classList.contains('link-active-class')).toBe(false);

        document.body.appendChild(element);
        return Promise.resolve().then(() => {
            expect(slottedElement.classList.contains('link-active-class')).toBe(false);
        });
    });


    it('should re-apply the default activeClass to the slotted element when the slot element changes', () => {
        const routerInstance = new RouterWrapper('/example-path');
        const handler = jest.fn((event) => {
            const callback = event.detail;
            callback(routerInstance);
        });
        const element = createElement('c-link', {
            is: Link
        });
        element.addEventListener(REGISTER_ROUTER_EVENT_NAME, handler);
        element.to = '/example-path';

        const firstSlottedElement = document.createElement('div');
        element.appendChild(firstSlottedElement);
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            // div element should exist and have 'link-active-class' added.
            let divElement = element.querySelector('div');
            let spanElement = element.querySelector('span');
            expect(spanElement).toBeNull();
            expect(divElement).not.toBeNull();
            expect(divElement.classList.contains('link-active-class')).toBe(true);

            // swap the div element for a span element in the slot
            const secondSlottedElement = document.createElement('span');
            element.removeChild(firstSlottedElement);
            element.appendChild(secondSlottedElement);
            return Promise.resolve().then(() => {
                // span element should now exist and have 'link-active-class' added.
                let divElement = element.querySelector('div');
                let spanElement = element.querySelector('span');
                expect(spanElement).not.toBeNull();
                expect(divElement).toBeNull();
                expect(spanElement.classList.contains('link-active-class')).toBe(true);
            });
        });
    });


    it('should add any custom activeClass value to the slotted element when it matches the current path', () => {
        const routerInstance = new RouterWrapper('/example-path');
        const handler = jest.fn((event) => {
            const callback = event.detail;
            callback(routerInstance);
        });
        const element = createElement('c-link', {
            is: Link
        });
        element.addEventListener(REGISTER_ROUTER_EVENT_NAME, handler);
        element.to = '/example-path';
        element.activeClass = "custom-active-class"

        const slottedElement = document.createElement('div');
        element.appendChild(slottedElement);

        document.body.appendChild(element);
        expect(slottedElement.classList.contains('link-active-class')).toBe(false);
        expect(slottedElement.classList.contains('custom-active-class')).toBe(false);

        return Promise.resolve().then(() => {
            expect(slottedElement.classList.contains('link-active-class')).toBe(false);
            expect(slottedElement.classList.contains('custom-active-class')).toBe(true);
        });
    });


    it('should add multiple custom activeClass values to the slotted element when it matches the current path', () => {
        const routerInstance = new RouterWrapper('/example-path');
        const handler = jest.fn((event) => {
            const callback = event.detail;
            callback(routerInstance);
        });
        const element = createElement('c-link', {
            is: Link
        });
        element.addEventListener(REGISTER_ROUTER_EVENT_NAME, handler);
        element.to = '/example-path';
        element.activeClass = "custom-active-class1 custom-active-class2"

        const slottedElement = document.createElement('div');
        element.appendChild(slottedElement);

        document.body.appendChild(element);
        expect(slottedElement.classList.contains('link-active-class')).toBe(false);
        expect(slottedElement.classList.contains('custom-active-class1')).toBe(false);
        expect(slottedElement.classList.contains('custom-active-class2')).toBe(false);

        return Promise.resolve().then(() => {
            expect(slottedElement.classList.contains('link-active-class')).toBe(false);
            expect(slottedElement.classList.contains('custom-active-class1')).toBe(true);
            expect(slottedElement.classList.contains('custom-active-class2')).toBe(true);
        });
    });


    it('should re-apply any custom activeClass values to the new slotted element when the slot element changes', () => {
        const routerInstance = new RouterWrapper('/example-path');
        const handler = jest.fn((event) => {
            const callback = event.detail;
            callback(routerInstance);
        });
        const element = createElement('c-link', {
            is: Link
        });
        element.addEventListener(REGISTER_ROUTER_EVENT_NAME, handler);
        element.to = '/example-path';
        element.activeClass = "custom-active-class1 custom-active-class2"

        const firstSlottedElement = document.createElement('div');
        element.appendChild(firstSlottedElement);
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            // div element should exist and have the custom classes added.
            let divElement = element.querySelector('div');
            let spanElement = element.querySelector('span');
            expect(spanElement).toBeNull();
            expect(divElement).not.toBeNull();
            expect(divElement.classList.contains('custom-active-class1')).toBe(true);
            expect(divElement.classList.contains('custom-active-class2')).toBe(true);

            // swap the div element for a span element in the slot
            const secondSlottedElement = document.createElement('span');
            element.removeChild(firstSlottedElement);
            element.appendChild(secondSlottedElement);
            return Promise.resolve().then(() => {
                // span element should now exist and have the custom classes added.
                let divElement = element.querySelector('div');
                let spanElement = element.querySelector('span');
                expect(spanElement).not.toBeNull();
                expect(divElement).toBeNull();
                expect(spanElement.classList.contains('custom-active-class1')).toBe(true);
                expect(spanElement.classList.contains('custom-active-class2')).toBe(true);
            });
        });
    });
});


describe('after rendering c-link component', () => {
    it('should trigger a route change when default button is clicked', () => {
        const routerInstance = new RouterWrapper('/first-example-path');
        const handler = jest.fn((event) => {
            const callback = event.detail;
            callback(routerInstance);
        });
        const element = createElement('c-link', {
            is: Link
        });
        element.addEventListener(REGISTER_ROUTER_EVENT_NAME, handler);
        element.to = '/second-example-path';
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            expect(routerInstance.currentPath).toEqual('/first-example-path');
            expect(element.hasAttribute('active')).toBe(false);
            element.shadowRoot.querySelector('lightning-button').click();

            return Promise.resolve().then(() => {
                expect(routerInstance.currentPath).toEqual('/second-example-path');
                expect(element.hasAttribute('active')).toBe(true);
            });
        });
    });


    it('should trigger route change when slotted element is clicked', () => {
        const routerInstance = new RouterWrapper('/first-example-path');
        const handler = jest.fn((event) => {
            const callback = event.detail;
            callback(routerInstance);
        });
        const element = createElement('c-link', {
            is: Link
        });
        element.addEventListener(REGISTER_ROUTER_EVENT_NAME, handler);
        element.to = '/second-example-path';

        const slottedButton = document.createElement('button');
        element.appendChild(slottedButton);
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            expect(routerInstance.currentPath).toEqual('/first-example-path');
            expect(element.hasAttribute('active')).toBe(false);
            element.querySelector('button').click();

            return Promise.resolve().then(() => {
                expect(routerInstance.currentPath).toEqual('/second-example-path');
                expect(element.hasAttribute('active')).toBe(true);
            });
        });
    });


    it('should apply active attribute when route changes and it matches new current path', () => {
        const routerInstance = new RouterWrapper('/first-example-path');
        const handler = jest.fn((event) => {
            const callback = event.detail;
            callback(routerInstance);
        });
        const element = createElement('c-link', {
            is: Link
        });
        element.addEventListener(REGISTER_ROUTER_EVENT_NAME, handler);
        element.to = '/second-example-path';
        document.body.appendChild(element);
        expect(element.hasAttribute('active')).toBe(false);

        // route changes to match link path
        routerInstance.currentPath = '/second-example-path';

        return Promise.resolve().then(() => {
            expect(element.hasAttribute('active')).toBe(true);
        });
    });


    it('should not apply active attribute when route changes and it does not match new current path', () => {
        const routerInstance = new RouterWrapper('/first-example-path');
        const handler = jest.fn((event) => {
            const callback = event.detail;
            callback(routerInstance);
        });
        const element = createElement('c-link', {
            is: Link
        });
        element.addEventListener(REGISTER_ROUTER_EVENT_NAME, handler);
        element.to = '/second-example-path';
        document.body.appendChild(element);
        expect(element.hasAttribute('active')).toBe(false);

        // route changes to match link path
        routerInstance.currentPath = '/the-wrong-example-path';

        return Promise.resolve().then(() => {
            expect(element.hasAttribute('active')).toBe(false);
        });
    });


    it('should add the default activeClass to the slotted element when route changes and it matches the new current path', () => {
        const routerInstance = new RouterWrapper('/first-example-path');
        const handler = jest.fn((event) => {
            const callback = event.detail;
            callback(routerInstance);
        });
        const element = createElement('c-link', {
            is: Link
        });
        element.addEventListener(REGISTER_ROUTER_EVENT_NAME, handler);
        element.to = '/second-example-path';

        const slottedElement = document.createElement('div');
        element.appendChild(slottedElement);

        document.body.appendChild(element);
        expect(slottedElement.classList.contains('link-active-class')).toBe(false);

        // route changes to match link path
        routerInstance.currentPath = '/second-example-path';

        return Promise.resolve().then(() => {
            expect(slottedElement.classList.contains('link-active-class')).toBe(true);
        });
    });


    it('should not add the default activeClass to the slotted element when route changes and it does not match the new current path', () => {
        const routerInstance = new RouterWrapper('/first-example-path');
        const handler = jest.fn((event) => {
            const callback = event.detail;
            callback(routerInstance);
        });
        const element = createElement('c-link', {
            is: Link
        });
        element.addEventListener(REGISTER_ROUTER_EVENT_NAME, handler);
        element.to = '/second-example-path';

        const slottedElement = document.createElement('div');
        element.appendChild(slottedElement);

        document.body.appendChild(element);
        expect(slottedElement.classList.contains('link-active-class')).toBe(false);

        // route changes to match link path
        routerInstance.currentPath = '/the-wrong-example-path';

        return Promise.resolve().then(() => {
            expect(slottedElement.classList.contains('link-active-class')).toBe(false);
        });
    });
});
