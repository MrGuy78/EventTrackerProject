export class OldFriends {
  id: number;
  name: string;
  type: string;
  description: string;
  arrivalDate: number;
  departDate: number;
  imageUrl: string;

  constructor(
    id: number = 0,
    name: string = '',
    type: string = '',
    description: string = '',
    arrivalDate: number = 0,
    departDate: number = 0,
    imageUrl: string = '',
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.arrivalDate = arrivalDate;
    this.departDate = departDate;
    this.imageUrl = imageUrl;
  }
}
