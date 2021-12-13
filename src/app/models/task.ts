export class Task {

  constructor()
   {
    this._id = '';
    this.room = '';
    this.name = '';
    this.hour = '';
    this.transport = '';
    this.oxigen = false;
    this.destination = '';
    this.estat = [['Demanat', 'red']];
  }

  _id: string;
  room: string;
  name: string;
  hour: string;
  transport: string;
  oxigen: boolean;
  destination: string;
  estat:string[][];
}
