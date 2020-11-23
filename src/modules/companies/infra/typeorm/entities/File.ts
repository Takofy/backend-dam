import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Store from './Store';
import Campaign from './Campaign';

@Entity('files')
class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nm_title: string;

  @Column()
  nm_description: string;

  @Column()
  nm_original_file_name: string;

  @Column()
  nm_type: string;

  @Column()
  nm_subtype: string;

  @Column()
  nm_mime: string;

  @Column()
  nm_s3_version: string;

  @Column()
  nm_s3_name: string;

  @Column()
  nm_url: string;

  @Column()
  nr_code: number;

  @Column()
  nr_width: number;

  @Column()
  nr_height: number;

  @Column()
  nr_size: number;

  @Column()
  dt_publication: Date;

  @Column()
  dt_expiration: Date;

  @Column()
  user_owner_id: string;

  @Column()
  campaign_owner_id: string;

  @ManyToOne(() => Campaign, campaign => campaign.files)
  @JoinColumn({ name: 'campaign_owner_id' })
  campaign: Campaign;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_owner_id' })
  user: User;

  @Column()
  store_owner_id: string;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_owner_id' })
  store: Store;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default File;
