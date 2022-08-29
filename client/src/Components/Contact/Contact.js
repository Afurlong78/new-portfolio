import React, { useState, useRef } from "react";
import Styled from "../Global/Styles";
import { useInView } from "react-intersection-observer";
import { AiFillCloseCircle } from "react-icons/ai";
import { SiMinutemailer } from "react-icons/si";
import { GiPartyPopper } from "react-icons/gi";
import { useThemeContext } from "../../Providers/ThemeProvider";
import { useContactContext } from "../../Providers/ContactProvider";
import {
  FormContainer,
  SuccessfulRegistryContainer,
  CloseSuccessfulRegistry,
  SuccessTextContainer,
  SuccessHeaderText,
  GoodbyeText,
  GoodbyeTextContainer,
  FormTextContainer,
  Input,
  TextContainer,
  FormBtnRow,
  FormBtn,
  MainContact,
  IconContainer,
  SpinnerContainer,
  RedSpinner,
  BlueSpinner,
  GreenSpinner,
} from "./Styles";

function Contact() {
  const { theme } = useThemeContext();
  const {
    contactHandler,
    success,
    closeHandler,
    setEmail,
    email,
    setContactMessage,
    contactMessage,
    setContactSubject,
    contactSubject,
    loading,
    emailError,
    subjectError,
    messageError,
  } = useContactContext();

  const { ref: headerRef, inView: headerVisible } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  });
  const { ref: goodbyeRef, inView: goodbyeVisible } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  });
  const { ref: formRef, inView: formVisible } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  });

  return (
    <Styled.SectionWrapper id="contact" status={theme}>
      <Styled.Container>
        <SuccessfulRegistryContainer status={success}>
          <CloseSuccessfulRegistry onClick={closeHandler}>
            <AiFillCloseCircle style={{ height: "100%", width: "100%" }} />
          </CloseSuccessfulRegistry>
          <SuccessTextContainer>
            <SuccessHeaderText>
              Congratulations! <GiPartyPopper className="ms-3" />
            </SuccessHeaderText>
            Your Email has been sent! I will reply in a timely fashion. Thanks!
          </SuccessTextContainer>
        </SuccessfulRegistryContainer>

        <Styled.VisibleWrapper ref={headerRef} visible={headerVisible}>
          <Styled.HeaderText status={theme}>
            <strong style={theme ? { color: "white" } : { color: "#6D97FF" }}>
              Contact
            </strong>{" "}
            Me
          </Styled.HeaderText>
        </Styled.VisibleWrapper>

        <MainContact >
          <GoodbyeTextContainer ref={goodbyeRef} visible={goodbyeVisible}>
            <GoodbyeText status={theme}>
              {loading ? (
                <SpinnerContainer>
                  Sending...
                  <RedSpinner />
                  <BlueSpinner />
                  <GreenSpinner />
                </SpinnerContainer>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div>
                    Thanks so much for visiting my site, it truly means a lot! I
                    hope you enjoyed your visit, please feel free to reach out
                    with any feedback, comments or even potential buisness
                    oppertunities.
                  </div>
                  <IconContainer status={theme}>
                    <SiMinutemailer style={{ height: "100%", width: "100%" }} />
                  </IconContainer>
                </div>
              )}
            </GoodbyeText>
          </GoodbyeTextContainer>

          <FormContainer
            ref={formRef}
            visible={formVisible}
            onSubmit={contactHandler}
          >
            <Styled.Column>
              <Styled.Row>
                <FormTextContainer status={theme}>Email:</FormTextContainer>
                <Input
                  placeholder="Enter your email..."
                  status={theme}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Styled.Row>
              {emailError ? (
                <Styled.Error status={theme}>{emailError}</Styled.Error>
              ) : (
                <Styled.Error></Styled.Error>
              )}
            </Styled.Column>

            <Styled.Column>
              <Styled.Row>
                <FormTextContainer status={theme}>Subject:</FormTextContainer>
                <Input
                  placeholder="Enter the subject..."
                  status={theme}
                  onChange={(e) => setContactSubject(e.target.value)}
                  value={contactSubject}
                />
              </Styled.Row>
              {subjectError ? (
                <Styled.Error status={theme}>{subjectError}</Styled.Error>
              ) : (
                <Styled.Error></Styled.Error>
              )}
            </Styled.Column>

            <Styled.Column>
              <Styled.Row>
                <FormTextContainer status={theme}>Message:</FormTextContainer>
                <TextContainer
                  placeholder="Enter your message..."
                  status={theme}
                  onChange={(e) => setContactMessage(e.target.value)}
                  value={contactMessage}
                />
              </Styled.Row>
              {messageError ? (
                <Styled.Error status={theme}>{messageError}</Styled.Error>
              ) : (
                <Styled.Error></Styled.Error>
              )}
            </Styled.Column>

            <FormBtnRow>
              <FormBtn onClick={contactHandler}>Submit</FormBtn>
            </FormBtnRow>
          </FormContainer>
        </MainContact>
      </Styled.Container>
    </Styled.SectionWrapper>
  );
}

export default Contact;
