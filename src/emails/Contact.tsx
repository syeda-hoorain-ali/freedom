import { Body, Column, Font, Head, Heading, Html, Img, Link, Row, Section, Text } from "@react-email/components";

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  message: string
}

const ContactEmail = ({ firstName, lastName, email, message }: Props) => {
  return (<>
    <Html>
      <Head>
        <Font
          fontFamily="Poppins"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Body>
        <Section style={{ padding: '0 20px' }}>
          <Row>
            <Column>
              <Heading as="h1">Hi Syeda Hoorain Ali</Heading>
              <Heading as="h2">From {firstName} {lastName}</Heading>
              <Link href={`mailto:${email}`}>{email}</Link>
            </Column>

            <Column>
              <Img style={{ borderRadius: '50%', textAlign: 'center' }} src="https://avatars.githubusercontent.com/u/156098367?v=4" alt="Logo" width={100} />
            </Column>
          </Row>
        </Section>

        <Section style={{ padding: '30px 10px 0 10px' }}>
          <Text>{message}</Text>
        </Section>

      </Body>
    </Html>
  </>)
}

export default ContactEmail;
