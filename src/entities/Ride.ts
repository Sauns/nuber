import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { rideStatus } from "src/types/types";
import User from "./User";

@Entity()
class Ride extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({
    type: "text",
    enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTED", "ONROUTE"],
  })
  status: rideStatus;

  @Column({ type: "text" })
  pickUpAdress: string;

  @Column({ type: "double precision", default: 0 })
  pickUpLat: number;

  @Column({ type: "double precision", default: 0 })
  pickUpLng: number;

  @Column({ type: "text" })
  dropOfAdress: string;

  @Column({ type: "double precision", default: 0 })
  dropOfLat: number;

  @Column({ type: "double precision", default: 0 })
  dropOfLng: number;

  @Column({ type: "double precision", default: 0 })
  price: number;

  @Column({ type: "text" })
  distance: string;

  @Column({ type: "text" })
  duration: string;

  @ManyToOne((type) => User, (user) => user.ridesAsDriver)
  passenger: User;

  @ManyToOne((type) => User, (user) => user.ridesAsDriver)
  driver: User;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Ride;
