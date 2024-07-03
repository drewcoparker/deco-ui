import { AttachInternals, Component, Prop, State, h, Event, EventEmitter } from '@stencil/core';
import { FormValidationService } from '../../services/form-validation-service';

@Component({
  tag: 'deco-input',
  styleUrl: 'deco-input.css',
  formAssociated: true,
})
export class DecoInput {
  private formValidationService: FormValidationService;

  @Prop() name!: string;
  @Prop() placeHolder: string = '';
  @Prop() label: string;
  @Prop() type = 'text';
  @Prop() required = false;

  @State() value: string = '';
  @State() errorMessage: string = '';

  @AttachInternals() internals: ElementInternals;

  @Event() inputBlur: EventEmitter;

  constructor() {
    this.formValidationService = new FormValidationService();
  }

  /**
   * Handles the change event of the input element.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - The change event object.
   */
  private handleChange = (event: Event) => {
    this.value = (event.target as HTMLInputElement).value;
    this.internals.setFormValue((event.target as HTMLInputElement).value);
  };

  /**
   * Handles the focus event for the input element.
   * Clears the error message.
   */
  private handleFocus = () => {
    this.errorMessage = '';
  };

  /**
   * Handles the blur event for the input element. Emits the event to the parent component.
   *
   * @param event - The blur event object.
   */
  private handleBlur = (event: Event) => {
    this.errorMessage = this.formValidationService.handleInputValidity(this.type, this.value, this.internals);
    this.inputBlur.emit(event);
  };

  render() {
    return (
      <div class="input-container">
        {this.label && (
          <label class="label">
            {this.required && <span class="required">*</span>}
            {this.label}
          </label>
        )}
        <input
          name={this.name}
          class={this.errorMessage ? 'error' : ''}
          type={this.type}
          required={this.required}
          value={this.value}
          placeholder={this.placeHolder}
          onInput={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        ></input>
        <div class="error-container">{this.errorMessage && <div class="error-message">{this.errorMessage}</div>}</div>
      </div>
    );
  }
}
