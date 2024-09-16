import { Entity, PrimaryGeneratedColumn, OneToMany, Column} from 'typeorm';
import { Survey } from '../../survey/entities/survey.entity';

@Entity('users') // Nombre de la tabla en la base de datos
export class User {
  @PrimaryGeneratedColumn() // Clave primaria auto-generada
  id: number;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 50 })
  role: string;

  @OneToMany(() => Survey, survey => survey.createdBy)
  createdSurveys?: Survey[];

  @OneToMany(() => Survey, survey => survey.updatedBy)
  updatedSurveys?: Survey[];
}