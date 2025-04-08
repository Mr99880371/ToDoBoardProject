import Tag from '../components/TagInput';

export default {
  title: 'Components/TagInput',
  component: Tag,
};

export const Default = () => <Tag value={[]} onChange={() => {}} error={false} />;

export const Error = () => <Tag value={[]} onChange={() => {}} error={true} />;
