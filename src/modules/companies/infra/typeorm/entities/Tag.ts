import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  // OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// import FileTags from './FileTags';
import Store from './Store';

@Entity('tags')
class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nm_tag: string;

  @Column()
  is_fixed: boolean;

  @Column()
  store_owner_id: string;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Store, store => store.tags)
  @JoinColumn({ name: 'store_owner_id' })
  store: Store;

  // @OneToMany(type => FileTags, fileTag => fileTag.tag)
  // fileTags: FileTags[];
}

export default Tag;
