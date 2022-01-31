import type { NextPage } from 'next';
import Section from '../components/Section/Section';
import { SectionColumn } from '../components/Section';
import TextBlock from '../components/Section/TextBlock';
import AppFrame from '../components/AppFrame';

const Home: NextPage = () => {
  return (
    <AppFrame>
      <Section backgroundImage={'/images/lagom.jpg'} fitHeight>
        <SectionColumn alignItems={'center'}>
          <TextBlock title={'Lagom'} caption={'APPS unveils new studio'} titleVariant={'h1'} isBackgroundDark />
        </SectionColumn>
      </Section>
      <Section backgroundColor={'#FAFAFA'}>
        <TextBlock
          title={'Innovation and experience design agency.'}
          text={() => (
            <>
              Apps is an innovation and experience design agency.
              <br />
              We exist to create a better future with you.
            </>
          )}
          textAlign={'center'}
          buttonLabel={'Products'}
          buttonHref={'/products'}
        />
      </Section>
      <Section>
        <SectionColumn
          xs={12}
          sm={6}
          sx={{
            background: `url('/images/mountains.jpg') no-repeat center center`,
            backgroundSize: 'cover',
          }}
          square
        />
        <SectionColumn xs={12} sm={6} alignItems={'center'}>
          <TextBlock
            title={'The imaginative application of art and science.'}
            text={
              'We architect, design and deliver iconic experiences, services and products that improve people’s lives. '
            }
            buttonLabel={'Read Latest'}
            buttonHref={'/news'}
          />
        </SectionColumn>
      </Section>
    </AppFrame>
  );
};

export default Home;
