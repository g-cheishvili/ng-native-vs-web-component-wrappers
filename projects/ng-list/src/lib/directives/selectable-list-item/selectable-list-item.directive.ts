import {Directive, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, Output, Renderer2} from "@angular/core";
import {BooleanInput, coerceBooleanProperty} from "@angular/cdk/coercion";
import {SelectableListItemToken} from "../../tokens";
import {SelectableItem} from "../../types";

@Directive({
  selector: 'li[ng-list-item][selectable]',
  providers: [
    {
      provide: SelectableListItemToken,
      useExisting: forwardRef(() => SelectableListItemDirective)
    }
  ]
})
export class SelectableListItemDirective<ValueType = any> implements SelectableItem<ValueType>, OnDestroy {
  @Input()
  get selectable(): boolean {
    return this._selectable;
  }

  set selectable(value: BooleanInput) {
    this._selectable = coerceBooleanProperty(value);
    this.renderer.setAttribute(this.elementRef.nativeElement, 'tabindex', this._selectable ? '0' : '-1');
  }

  @Input()
  value!: ValueType;

  @Output()
  clicked = new EventEmitter();

  get selected() {
    return this._selected;
  }

  private _selectable = false;
  private _selected = false;
  private _listeners: Array<() => void> = [];

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this._listeners = [
      this.renderer.listen(this.elementRef.nativeElement, 'click', this._clicked),
      this.renderer.listen(this.elementRef.nativeElement, 'keydown.enter', this._clicked),
      this.renderer.listen(this.elementRef.nativeElement, 'keydown.space', ($event) => {
        $event.preventDefault();
        this._clicked();
      })
    ];
  }

  private _clicked = () => {
    if (this._selectable) {
      this.clicked.emit(this.value);
    }
  }

  select = () => {
    this.renderer.addClass(this.elementRef.nativeElement, 'is-selected');
    this._selected = true;
  }

  deselect = () => {
    this.renderer.removeClass(this.elementRef.nativeElement, 'is-selected');
    this._selected = false;
  }

  ngOnDestroy() {
    this._listeners.forEach(listener => listener());
  }
}
