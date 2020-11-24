import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import File from './File';
import Tag from './Tag';

@Entity('file_tags')
class FileTags {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  file_id: string;

  @Column()
  tag_id: string;

  @Column()
  active: boolean;

  @ManyToOne(() => File, file => file.fileTags)
  @JoinColumn({ name: 'file_id' })
  file: File;

  @ManyToOne(() => Tag, tag => tag.fileTags)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}

export default FileTags;
