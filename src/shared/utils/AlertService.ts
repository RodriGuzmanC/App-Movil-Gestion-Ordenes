// AlertService.ts
type ShowAlert = (msg: string, type: 'info' | 'success' | 'error') => void;

class AlertServiceClass {
  private _showAlert?: ShowAlert;

  setHandler(handler: ShowAlert) {
    this._showAlert = handler;
  }

  show(msg: string, type: 'info' | 'success' | 'error' = 'info') {
    this._showAlert?.(msg, type);
  }
}

export const AlertService = new AlertServiceClass();
