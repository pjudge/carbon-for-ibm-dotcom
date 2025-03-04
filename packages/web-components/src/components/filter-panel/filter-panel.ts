/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import Reset from '../../internal/vendor/@carbon/web-components/icons/reset/16.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './filter-panel.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The filter panel.
 *
 * @element dds-filter-panel
 */
@customElement(`${ddsPrefix}-filter-panel`)
class DDSFilterPanel extends HostListenerMixin(
  StableSelectorMixin(LitElement)
) {
  /**
   * Renders the filter heading
   */
  @property()
  heading!: string;

  /**
   * Handles `click` event on the `<input>` in the shadow DOM.
   */
  protected _handleClear() {
    const { eventSelectionClear } = this.constructor as typeof DDSFilterPanel;
    this.dispatchEvent(
      new CustomEvent(eventSelectionClear, {
        bubbles: true,
        composed: true,
        detail: {
          clear: true,
        },
      })
    );
  }

  /**
   * the filter title
   */
  @property()
  title = '';

  /**
   * renders the selected values
   */
  @property()
  selectedValues: any[] = [];

  /**
   * Handles items in the selected array
   */
  @property({ attribute: 'has-selections', type: Boolean })
  hasSelections = false;

  render() {
    return html`
      <section class="${prefix}--filter-panel__section">
        <div class="${prefix}--heading-clear">
          <div class="${prefix}--filter__heading">${this.heading}</div>
          <button class="${prefix}--clear" @click=${this._handleClear}>
            <div class="${prefix}--clear__container">
              Clear
              <div class="${prefix}--reset__icon">${Reset()}</div>
            </div>
          </button>
        </div>
        <slot></slot>
      </section>
    `;
  }

  /**
   * The name of the custom event fired to clear selections
   */

  static get eventSelectionClear() {
    return `${ddsPrefix}-selection-clear`;
  }

  static get stableSelector() {
    return `${ddsPrefix}-filter-panel`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSFilterPanel;
