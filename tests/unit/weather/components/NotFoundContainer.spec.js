import NotFoundContainer from '@/components/NotFoundContainer.vue';
import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';

describe('NotFoundContainer.vue', () => {
    it('should display the appropriate not found message', () => {
        const wrapper = shallowMount(NotFoundContainer);
        expect(wrapper.html()).to.contain(
            /* html */
            `<h1 class="subtitle is-size-3">Sorry, this route does not exist :(</h1>`
        );
    });
});