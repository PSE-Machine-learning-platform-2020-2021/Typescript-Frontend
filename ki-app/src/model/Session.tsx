class Session {
    private id:number
  
    constructor(id:number, admin:Admin) {}
    connectUser(user:User):void {}
    disconnectUser(user:User):void {}
    getConnectedUsers():User[] {}
    getId():number {}
  } export {Session}