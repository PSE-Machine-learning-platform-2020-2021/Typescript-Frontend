import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

/**
 * Behandeln Emailliste mit Hinzufügen und Löschen, wählen Eamils auszuliefern
 */
export default class EmailList extends Component {
	private static readonly E_INPUT_EMPTY_DE: string = "Die Eingabe darf nicht leer sein!";
	private static readonly E_INPUT_DUPLICATE_DE: string = "Diese E-Mail-Adresse ist schon in der Liste!";
	private static readonly E_INPUT_INVALID_DE: string = "Der eingebene Wert kann keine gültige E-Mail-Adresse sein!";
	private static readonly Q_DELETE_ADDRESS_SINGLE_DE: string = "Sind Sie sich sicher, die gewählte Emailadresse löschen zu wollen?";
	private static readonly Q_DELETE_ADDRESS_MULTI_DE: string = "Sind Sie sich sicher, die gewählten Emailadressen löschen zu wollen?";
	private static readonly T_ADD_BUTTON_DE: string = "Neue Emailadresse hinzufügen";
	private static readonly T_ADD_PLACEHOLDER_DE: string = "Eingabe mit Eingabetaste abschließen";
	private static readonly T_SELECTION_COUNT_PART_DE: string = "Gewählt";
	private static readonly T_SELECTION_COUNT_FULL_DE: string = "Insgesamt";
	private static readonly T_SEND_BUTTON_DE: string = "Ausliefern";
	private static readonly T_DELETE_BUTTON_DE: string = "Löschen";
	private static readonly T_DELETE_ALL_BUTTON_DE: string = "Alle ausgewählten Emailadressen löschen";

	/**
	 * Variablen und Methoden welche der Klasse zur verfügung gestellt werden müssen
	 */
	props = {
		delivery: function (chosenEmails: string[]) { }
	};

	/**
	 * Status für diese Komponente
	 */
	state = {
		mouse: false,
		addButtonClick: false,
		inputempty: true,
		inputemail: {
			id: '',
			address: '',
			chosen: false
		},
		emails: [] as { id: string, address: string, chosen: boolean }[]
	};

	/**
	 * Erstellen Eingabefeld
	 */
	handleCreate = () => {
		this.setState({ addButtonClick: true });
	};

	/**
	 * Eingabe Methode
	 * @param e ChangeEventInput
	 */
	inputchange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.value === '') {
			this.setState({ inputempty: true });
		} else {
			this.setState({ inputemail: { id: nanoid(), address: e.target.value, chosen: false }, inputempty: false });
		}

	};

	/**
	 * Diese Methode verarbeitet eingegebene E-Mail-Adressen.
	 * 
	 * @param e KeyboardEvent - über dieses Event wird die Methode ausgelöst. Es enthält ein paar Werte, die im weiteren Verlauf noch benötigt werden.
	 */
	handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		const { keyCode } = e;
		// check ENTER-key
		if (keyCode !== 13) return;
		// cant add empty email
		const { inputemail, inputempty, emails } = this.state;
		if (inputempty) {
			NotificationManager.error(EmailList.E_INPUT_EMPTY_DE, "", 3000);
			return;
		}
		const exists = emails.map(emailObj => emailObj.address === inputemail.address).includes(true);
		if (exists) {
			NotificationManager.error(EmailList.E_INPUT_DUPLICATE_DE, "", 3000);
			return;
		}
		var pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z])+$/;
		if (pattern.test(inputemail.address)) {
			this.addEmail(inputemail);
		} else {
			NotificationManager.error(EmailList.E_INPUT_INVALID_DE, "", 3000);
			return;
		}

		// hide inputbox
		this.setState({ addButtonClick: false });
	};

	/**
	 * Behandeln Mausstatus
	 * 
	 * @param flag Mausstatus
	 * @returns Ein vorbereiteter Funktionsaufruf zur Statusaktualisierung.
	 */
	handleMouse = (flag: boolean) => {
		return () => this.setState({ mouse: flag });
	};

	/**
	 * Wählen Email Methode
	 * 
	 * @param id gewählt EmailID
	 * @param chosen gewählt oder nicht
	 */
	handleCheck = (id: string, chosen: boolean) => {
		const { emails } = this.state;
		const newEmails = emails.map((emailObj) => {
			if (emailObj.id === id) return { ...emailObj, chosen };
			else return emailObj;
		});
		this.setState({ emails: newEmails });
	};

	/**
	 * Löschen Methode
	 * 
	 * @param id EmailID zu löschen
	 */
	handleDelete = (id: string): void => {
		if (window.confirm(EmailList.Q_DELETE_ADDRESS_SINGLE_DE)) {
			const { emails } = this.state;
			const newEmails = emails.filter((emailObj) => {
				return emailObj.id !== id;
			});
			// update emailList
			this.setState({ emails: newEmails });
		}
	};

	/**
	 * Diese Methode fügt eine E-Mail-Adresse zur Liste der E-Mail-Adressen hinzu und aktualisiert die Ansicht.
	 * 
	 * @param emailObj Ein klassenloses Objekt, das die benötigten Daten einer E-Mail-Adresse enthält.
	 */
	addEmail = (emailObj: { id: string, address: string, chosen: boolean; }): void => {
		const { emails } = this.state;
		const newEmails = [emailObj, ...emails];
		// update emailList
		this.setState({ emails: newEmails });
	};

	/**
	 * Diese Methode löscht eine E-Mail-Adresse aus der Liste der E-Mail-Adressen und aktualisiert die Ansicht.
	 * 
	 * @param emailObj Die ID der zu löschenden Adresse.
	 */
	deleteEmail = (id: string): void => {
		// get orignal emailList
		// delete emailObj with id
		const { emails } = this.state;
		const newEmails = emails.filter(emailObj => emailObj.id !== id);
		// update emailList
		this.setState({ emails: newEmails });
	};

	/**
	 * Diese Methode wählt alle E-Mail-Adressen in der Liste aus und aktualisiert die Ansicht.
	 * 
	 * @param emailObj Das auslösende Event
	 */
	chooseAllEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
		// get orignal emailList
		const chosen = e.target.checked;
		const { emails } = this.state;
		const newEmails = emails.map(emailObj => {return { ...emailObj, chosen };});
		// update emailList
		this.setState({ emails: newEmails });
	};

	/**
	 * Diese Methode löscht alle ausgewählten E-Mail-Adresse 
	 * aus der Liste der E-Mail-Adressen und aktualisiert die Ansicht.
	 */
	clearAllChosen = (): void => {
		if (window.confirm(EmailList.Q_DELETE_ADDRESS_MULTI_DE)) {
			// get orignal emailList
			const { emails } = this.state;	
			const newEmails = emails.filter(emailObj => !emailObj.chosen);
			// update emaillist
			this.setState({ emails: newEmails });
		}
	};

	/**
	 * Ausliefern-Methode
	 */
	delivery = (): void => {
		const { emails } = this.state;
		const emailAddressList: string[] = emails.filter(entry => entry.chosen).map(entry => entry.address);
		this.props.delivery(emailAddressList);
	};

	/**
	 * Render Methode der Komponente
	 * 
	 * @returns Aufbau der Komponente
	 */
	render() {
		const { mouse, emails } = this.state;
		const chosenCount = emails.reduce((pre, email) => pre + (email.chosen ? 1 : 0), 0);
		//total amount
		const total = emails.length;
		return (
			<div className="email-main">
				<div className="view-section">
					<button onClick={() => this.handleCreate()} className="addemail-btn" >{EmailList.T_ADD_BUTTON_DE}</button>
				</div>
				{this.state.addButtonClick ?
				<div className="inputbox view-section">
					<input value={this.state.inputemail.address} onKeyUp={this.handleKeyUp} onChange={this.inputchange} type="text" placeholder={EmailList.T_ADD_PLACEHOLDER_DE} className="emailinput" />
				</div> : null}
				<div className="view-section">
					{emails.map(emailObj => {
						return (
							<li  className="list" style={{ backgroundColor: mouse ? '#ddd' : '#fff' }} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
								<label>
									<input className='emailitemcheck' type="checkbox" checked={emailObj.chosen} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.handleCheck(emailObj.id, e.target.checked)} />
									<span>{emailObj.address}</span>
								</label>
								<button onClick={() => this.handleDelete(emailObj.id)} className="btn-item" style={{ display: mouse ? 'block' : 'none' }}>{EmailList.T_DELETE_BUTTON_DE}</button>
							</li>
						);
					})}
				</div>
				<div className="view-section">
					<input className='chooseall' type="checkbox" onChange={this.chooseAllEmail} checked={chosenCount === total && total !== 0 ? true : false} />
					<span>
						<span>{EmailList.T_SELECTION_COUNT_PART_DE}: {chosenCount}</span> / {EmailList.T_SELECTION_COUNT_FULL_DE}: {total}
					</span>
					<button onClick={() => this.clearAllChosen()} disabled className="btn-clear">{EmailList.T_DELETE_ALL_BUTTON_DE}</button>
				</div>

				<div className="view-section">
					<button onClick={() => this.delivery()} className="delivery-btn" >{EmailList.T_SEND_BUTTON_DE}</button>
				</div>
			</div>
		);
	}
}
