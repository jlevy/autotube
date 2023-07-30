import { FAQ_NAME } from '@/collections/utils/collectionNames';
import Layout from '@/layout/components/Layout';
import ReaderView from '@/views/components/ReaderView';

export default function FaqPage() {
  return (
    <Layout>
      <ReaderView collectionName={FAQ_NAME} />
    </Layout>
  );
}
