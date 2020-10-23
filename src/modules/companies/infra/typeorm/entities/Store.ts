import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

@Entity('stores')
class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nm_corporate_name: string;

  @Column()
  nm_fantasy_name: string;

  @Column()
  nm_initials: string;

  @Column()
  nr_cnpj: number;

  @Column()
  nr_inscricao_estadual: number;

  @Column()
  nr_ccm: number;

  @Column('timestamp with time zone')
  dt_born: Date;

  @Column()
  id_company_owner: string;

  @ManyToMany(() => Store)
  @JoinColumn({ name: 'id_company_owner' })
  company_owner: Store;

  @Column()
  type_company: string;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Store;
