import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
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
  type_company: string;

  @Column()
  nm_primary_color: string;

  @Column()
  nm_secondary_color: string;

  @Column()
  nm_tertiary_color: string;

  @Column()
  path_logo: string;

  @Column()
  path_backgorund: string;

  @Column()
  nm_facebook: string;

  @Column()
  nm_instagram: string;

  @Column()
  nm_linkedin: string;

  @Column()
  nm_twitter: string;

  @Column()
  nm_youtube: string;

  @Column()
  nm_tiktok: string;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Store;
