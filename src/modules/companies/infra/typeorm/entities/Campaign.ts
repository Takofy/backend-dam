import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Store from './Store';
import File from './File';

@Entity('campaigns')
class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nm_campaign_name: string;

  @Column()
  nm_campaign_description: string;

  @Column()
  path_image: string;

  @Column()
  user_owner_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_owner_id' })
  user: User;

  @Column()
  store_owner_id: string;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_owner_id' })
  store: Store;

  @OneToMany(() => File, file => file.campaign)
  files: File[];

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Campaign;
