import React, { Component } from 'react'
import { nanoid } from 'nanoid';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
export default class EmailList extends Component {
	props = {
		delivery: function (chosenEmails: string[]) { }
	}

	state = {
		mouse: false,
		addButtonClick: false,
		inputempty: true,
		inputemail: {
			id: '',
			address: '',
			chosen: false
		},
		emails: [{
			id: 'example',
			address: 'xxxxx@xxx.xx(Beispiel, nach erstmal Addieren automatisch gelöscht)',
			chosen: false
		}]
	}

	handleCreate = () => {
		this.setState({ addButtonClick: true });
	};

	inputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// eslint-disable-next-line
		if (e.target.value == '') {
			this.setState({ inputempty: true })
		} else {
			this.setState({ inputemail: { id: nanoid(), address: e.target.value, chosen: false }, inputempty: false })
		}

	}
	handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		this.deleteEmail('example')
		const { keyCode } = e;
		//check ENTER-key
		if (keyCode !== 13) return;
		//cant add empty email
		const { inputemail, inputempty, emails } = this.state
		if (inputempty) {
			NotificationManager.error("Eingabe darf nicht leer sein!", "", 3000);
			return;
		}
		let exist = false
		emails.map((emailObj) => {
			// eslint-disable-next-line
			if (emailObj.address == inputemail.address) exist = true
			return emailObj
		})
		if (exist) {
			NotificationManager.error("Es gibt schon Emailadresse in List!", "", 3000);
			return;
		}
		var pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z])+$/
		if (pattern.test(inputemail.address)) {
			this.addEmail(inputemail);
		} else {
			NotificationManager.error("Sie müssen eine Emailadresse eingeben!", "", 3000);
			return;
		}

		//hide inputbox
		this.setState({ addButtonClick: false });
	};

	//handle emailItem
	handleMouse = (flag: boolean) => {
		return () => {
			this.setState({ mouse: flag });
		};
	};

	handleCheck = (id: string, chosen: boolean) => {
		const { emails } = this.state
		const newEmails = emails.map((emailObj) => {
			// eslint-disable-next-line
			if (emailObj.id == id) return { ...emailObj, chosen };
			else return emailObj;
		})
		this.setState({ emails: newEmails })
	};

	handleDelete = (id: string) => {
		if (window.confirm('Sind Sie sicher, die gewählt Emailadresse zu löschen?')) {
			const { emails } = this.state
			const newEmails = emails.filter((emailObj) => {
				return emailObj.id !== id;
			});
			//update emailList
			this.setState({ emails: newEmails })
		}
	};

	//addEmail for add new Email
	addEmail = (emailObj: { id: string, address: string, chosen: boolean }) => {
		//add new one
		const { emails } = this.state
		const newEmails = [emailObj, ...emails];
		//update emailList
		this.setState({ emails: newEmails })
	};

	//deleteEmail for delete emailObj
	deleteEmail = (id: string) => {
		//get orignal emailList
		//delete emailObj with id
		const { emails } = this.state
		const newEmails = emails.filter((emailObj) => {
			return emailObj.id !== id;
		});
		//update emailList
		this.setState({ emails: newEmails })
	};

	//checkAllEmail for all chosen email
	chooseAllEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		//get orignal emailList
		const chosen = e.target.checked
		const { emails } = this.state
		const newEmails = emails.map((emailObj) => {
			return { ...emailObj, chosen };
		});
		//update emailList
		this.setState({ emails: newEmails })
	};

	//clearAllChosen for delete all emails
	clearAllChosen = () => {
		if (window.confirm('Sind Sie sicher, alle gewähte Emailadressen zu löschen?')) {
			//get orignal emailList
			const { emails } = this.state;
			//filter datas
			const newEmails = emails.filter((emailObj) => {
				return !emailObj.chosen;
			});
			//update emailLists
			this.setState({ emails: newEmails })
		}
	};
	//sendmethod
	delivery = () => {
		const { emails } = this.state;
		let emailaddressList: string[] = []
		emails.map((emailObj) => {
			if (emailObj.chosen) emailaddressList.push(emailObj.address)
			return emailObj
		});
		//console.log(emailaddressList)
		this.props.delivery(emailaddressList)
	}
	render() {
		const { mouse, emails } = this.state
		const chosenCount = emails.reduce((pre, email) => pre + (email.chosen ? 1 : 0), 0)
		//total amount
		const total = emails.length
		return (
			<div className="email-main">
				<div className="addemailbutton">
					<button onClick={() => this.handleCreate()} className="addemail-btn" >Addieren eine neue Emailadresse!(Addieren Eingaben mit 'Enter'-Taste)</button>
					{this.state.addButtonClick ?
						<div className="inputbox">
							<input value={this.state.inputemail.address} onKeyUp={this.handleKeyUp} onChange={this.inputchange} type="text" placeholder="input email address with ENTER-key" className="emailinput" />
						</div>
						: null}

				</div>

				{emails.map(emailObj => {
					return (
						<li style={{ backgroundColor: mouse ? '#ddd' : 'white' }} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
							<label>
								<input className='emailitemcheck' type="checkbox" checked={emailObj.chosen} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.handleCheck(emailObj.id, e.target.checked)} />
								<span>{emailObj.address}</span>
							</label>
							<button onClick={() => this.handleDelete(emailObj.id)} className="btn-item" style={{ display: mouse ? 'block' : 'none' }}>Löschen</button>
						</li>
					)
				})}

				<div className="handleallemail">
					<label>
						<input className='chooseall' type="checkbox" onChange={this.chooseAllEmail} checked={chosenCount === total && total !== 0 ? true : false} />
					</label>
					<span>
						<span>Gewählt: {chosenCount}</span> / Insegesamt: {total}
					</span>
					<button onClick={() => this.clearAllChosen()} className="btn-clear">Löschen alle gewählte Emailadressen!</button>
				</div>

				<div className="deliverybutton">
					<button onClick={() => this.delivery()} className="delivery-btn" >Liefern Aus!</button>
				</div>
			</div>
		)
	}
}
