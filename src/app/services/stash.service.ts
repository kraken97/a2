import { Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Notification } from "../models/notification";



@Injectable()
export class StashService {
  notifications = new Array<Notification>();
}
