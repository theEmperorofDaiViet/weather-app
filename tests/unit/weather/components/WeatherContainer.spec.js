import { createStore } from "vuex";
import WeatherContainer from "@/components/WeatherContainer.vue";
import { shallowMount } from "@vue/test-utils";
import { expect } from "chai";
import sinon from "sinon";
import chai from "chai";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

describe("WeatherContainer.vue", () => {
    let wrapper;
    let getters;
    let actions;
    let store;

    const setUpWrapper = (loading) => {
        getters = {
            location: () => "Hanoi, Vietnam",
            time: () => "Sat Nov 04 2023 16:30:00",
            weatherDescription: () => "Light Cloud",
            imageAbbr: () => "lc.png",
            weatherTemp: () => 30.0,
            loading: () => loading,
        };

        actions = {
            fetchWeather: sinon.stub(),
        };

        store = createStore({
            getters,
            actions,
        });

        wrapper = shallowMount(WeatherContainer, {
            global: {
                plugins: [store],
            },
        });
    };

    it("should render the correct content when the app is loading", () => {
        setUpWrapper(true);

        expect(wrapper.html()).to.contain(
            /* html */
            `<div class="loader"></div>`
        );
        expect(wrapper.html()).to.not.contain(
            /* html */
            `<h1 class="subtitle weather__city">Hanoi, Vietnam</h1>`
        );
        expect(wrapper.html()).to.not.contain(
            /* html */
            `<p class="app__date has-text-weight-bold">Sat Nov 04 2023 16:30:00</p>`
        );
        expect(wrapper.html()).to.not.contain(
            /* html */
            `<p class="weather__description">Light Cloud</p>`
        );
        expect(wrapper.html()).to.not.contain(
            /* html */
            `<p class="weather__temperature">30 ºC</p>`
        );
    });

    it("should render the correct content when the app is not loading", () => {
        setUpWrapper(false);

        expect(wrapper.html()).to.not.contain(
            /* html */
            `<div class="loader"></div>`
        );
        expect(wrapper.html()).to.contain(
            /* html */
            `<h1 class="subtitle weather__city">Hanoi, Vietnam</h1>`
        );
        expect(wrapper.html()).to.contain(
            /* html */
            `<p class="app__date has-text-weight-bold">Sat Nov 04 2023 16:30:00</p>`
        );
        expect(wrapper.html()).to.contain(
            /* html */
            `<p class="weather__description">Light Cloud</p>`
        );
        expect(wrapper.html()).to.contain(
            /* html */
            `<p class="weather__temperature">30 ºC</p>`
        );
    });

    it('should call the "fetchWeather" action once when created', () => {
        setUpWrapper(false);

        expect(actions.fetchWeather).to.have.been.calledOnce;
    });

    it('should also call the "fetchWeather" action when "id" is changed', () => {
        setUpWrapper(false);
        wrapper.vm.$options.watch.id.call(wrapper.vm);

        expect(actions.fetchWeather).to.have.been.calledTwice;
    });
});