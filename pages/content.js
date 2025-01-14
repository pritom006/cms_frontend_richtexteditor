// import ContentPage from '../components/ContentPage';

// const Content = () => {
//     return <ContentPage />;
// };

// export default Content;

import { useRouter } from 'next/router';
import ContentPage from '../components/ContentPage';
import ContentDetailPage from '../components/ContentDetailPage';

const Content = () => {
    const router = useRouter();
    const { id } = router.query;

    return id ? <ContentDetailPage /> : <ContentPage />;
};

export default Content;