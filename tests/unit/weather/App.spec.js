import { createStore } from "vuex";
import App from "@/App.vue";
import { shallowMount } from "@vue/test-utils";
import { expect } from "chai";

describe("App.vue", () => {
    let wrapper;
    let store;
    let getters;

    const setUpWrapper = (loading) => {
        getters = {
            loading: () => {
                return loading;
            },
        };
        store = createStore({
            getters,
        });
        wrapper = shallowMount(App, {
            global: {
                plugins: [store],
                stubs: ['router-link', 'router-view'],
            }
        });
    };

    it("should display the footer links when application is not loading", () => {
        setUpWrapper(false);
        const footerLinks = wrapper.find('.app__cities');

        expect(footerLinks.html()).to.contain(
            /* html */
            `<router-link-stub to="/weather/0"></router-link-stub>`
        );
        expect(footerLinks.html()).to.contain(
            /* html */
            `<router-link-stub to="/weather/1"></router-link-stub>`
        );
        expect(footerLinks.html()).to.contain(
            /* html */
            `<router-link-stub to="/weather/2"></router-link-stub>`
        );
        expect(footerLinks.html()).to.contain(
            /* html */
            `<router-link-stub to="/weather/3"></router-link-stub>`
        );
        expect(footerLinks.html()).to.contain(
            /* html */
            `<router-link-stub to="/weather/4"></router-link-stub>`
        );
        expect(footerLinks.html()).to.contain(
            /* html */
            `<router-link-stub to="/weather/5"></router-link-stub>`
        );
        expect(footerLinks.html()).to.contain(
            /* html */
            `<router-link-stub to="/weather/6"></router-link-stub>`
        );
        expect(footerLinks.html()).to.contain(
            /* html */
            `<router-link-stub to="/weather/7"></router-link-stub>`
        );
    });

    it("should not display the footer links when application is loading", () => {
        setUpWrapper(true);
        const footerLinks = wrapper.find(".app__cities");

        expect(wrapper).to.not.contain(footerLinks);
    });
});