import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import AppFrame from '../components/AppFrame';
import Section from '../components/Section';

const pages: Record<string, string> = {
  products: 'Products',
  news: 'News',
  contact: 'Contact',
  checkout: 'Checkout',
  404: 'Page not found',
};

const GenericPage: React.FC = () => {
  const router = useRouter();
  const { pageId } = router.query;

  const pageTitle = pageId && !Array.isArray(pageId) ? pages[pageId] : '';

  useEffect(() => {
    if (router && pageId && !pageTitle) {
      router.push('/404');
    }
  }, [router, pageId, pageTitle]);

  return (
    <AppFrame title={pageTitle}>
      <Section sx={{ flex: 1 }}>
        <Container>
          <Typography variant={'h1'} mt={8} mb={8}>
            {pageTitle}
          </Typography>
        </Container>
      </Section>
    </AppFrame>
  );
};

export default GenericPage;
