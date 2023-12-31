import HomeContainer from '@/components/HomeContainer.vue';
import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';

describe('HomeContainer.vue', () => {
    it('should display the appropriate index message', () => {
        const wrapper = shallowMount(HomeContainer);
        expect(wrapper.html()).to.contain(
            /* html */
            `<h1 class="subtitle is-size-3">Pick a city below to see the weather!</h1>`
        );
    });
});