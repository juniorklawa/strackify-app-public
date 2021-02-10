import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import Entypo from 'react-native-vector-icons/Entypo';
import * as yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import humanizeErrorCode from '../../utils/humanizeErrorCode';
import {
  BackDropContainer,
  BottomInfoContainer,
  Container,
  CoverContainer,
  ErrorText,
  GoBackButton,
  HeaderContainer,
  HeaderImage,
  Input,
  QuestionActionText,
  QuestionText,
  SignInButton,
  SignInText,
  TermsContainer,
  TermsText,
  Title,
} from './styles';
import api from '../../services/api';
import { translate } from '../../locales';

interface AuthModalProps {
  isNewUser?: boolean;
  shouldReloadPage: (prop: any) => any;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isNewUser = false,
  shouldReloadPage,
}) => {
  const navigation = useNavigation();
  const [isAuthModalActive, setIsAuthModalActive] = useState<boolean>(false);
  const [isLogging, setIsLogging] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const { user, authLogin, createUser } = useAuth();

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  const signUpValidationSchema = yup.object().shape({
    username: yup
      .string()
      .matches(/^[a-zA-Z0-9]/, 'No special characters')
      .min(3, ({ min }) => `Username must be at least ${min} characters`)
      .max(25, ({ max }) => `Max: ${max} characters`)
      .required('Nickname is required')
      .test(
        'username-backend-validation',
        'Esse username já existe',
        async (username) => {
          const response = await api.post('/checkUsername', {
            username,
          });
          const { usernameExists } = response.data;

          return usernameExists ? false : true;
        },
      ),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required('Confirm password is required'),
  });

  useEffect(() => {
    if (!user && isFocused) {
      setIsAuthModalActive(true);
    }
  }, [user, isFocused]);

  const resetParams = useCallback(() => {
    navigation.setParams({ isNewUser: false });
  }, [navigation]);

  const handleCloseModal = useCallback(() => {
    setIsAuthModalActive(false);
    navigation.navigate('Home');
    resetParams();
  }, [navigation, resetParams]);

  const handleIsLogging = useCallback((resetForm: Function) => {
    resetForm();
    setIsLogging((prevState) => !prevState);
  }, []);

  const handleCreateUser = useCallback(
    async ({ email, password, username }) => {
      try {
        setIsLoading(true);
        await createUser(email, password, username);
        setIsAuthModalActive(false);
        setIsLoading(false);
        setIsLogging(true);
        resetParams();
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    },
    [createUser, resetParams],
  );

  const handleLogin = useCallback(
    async ({ email, password }) => {
      try {
        setIsLoading(true);

        await authLogin(email, password);
        setIsAuthModalActive(false);
        setIsLoading(false);
        shouldReloadPage(true);
      } catch (error) {
        Alert.alert('Ops!', humanizeErrorCode(error.message));

        setIsLoading(false);
      }
    },
    [authLogin, shouldReloadPage],
  );

  return (
    <Modal animationType="slide" transparent={true} visible={isAuthModalActive}>
      <Container behavior={Platform.OS === 'ios' ? 'height' : 'height'}>
        <HeaderContainer>
          <GoBackButton onPress={handleCloseModal}>
            <Entypo name="chevron-thin-left" color="#0f0f0f" size={24} />
          </GoBackButton>
        </HeaderContainer>

        <BackDropContainer keyboardShouldPersistTaps={'always'}>
          {isLogging && !isNewUser ? (
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={loginValidationSchema}
              onSubmit={handleLogin}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
                resetForm,
              }) => (
                <>
                  <CoverContainer>
                    <HeaderImage
                      resizeMode="contain"
                      source={require('../../assets/cover.png')}
                    />
                  </CoverContainer>

                  <Title>E-mail</Title>

                  <Input
                    placeholder="Ex: johndoe@gmail.com"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  {errors.email && touched.email && (
                    <ErrorText>{errors.email}</ErrorText>
                  )}

                  <Title>{translate('auth_modal.password')}</Title>

                  <Input
                    placeholder="Ex: johndoe123"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                  />

                  {errors.password && touched.password && (
                    <ErrorText>{errors.password}</ErrorText>
                  )}

                  <SignInButton
                    disabled={isLoading || !isValid}
                    onPress={handleSubmit}>
                    {!isLoading ? (
                      <SignInText>{translate('auth_modal.login')}</SignInText>
                    ) : (
                      <ActivityIndicator size="large" color="#43cfc3" />
                    )}
                  </SignInButton>
                  <BottomInfoContainer>
                    <QuestionText>
                      {translate('auth_modal.does_not_have_account')}
                    </QuestionText>
                    <TouchableOpacity
                      onPress={() => handleIsLogging(resetForm)}>
                      <QuestionActionText>Criar</QuestionActionText>
                    </TouchableOpacity>
                  </BottomInfoContainer>

                  <TermsContainer>
                    <Hyperlink
                      linkStyle={styles.linkStyle}
                      onPress={(url) => Linking.openURL(url)}
                      linkText={(url) =>
                        url ===
                        'https://github.com/juniorklawa/strackify-terms/blob/main/TERMS_OF_USE.md'
                          ? translate('auth_modal.terms_of_use')
                          : url ===
                            'https://github.com/juniorklawa/strackify-terms/blob/main/PRIVACY_POLICY.md'
                          ? translate('auth_modal.privacy_policy')
                          : url
                      }>
                      <TermsText>
                        {`${translate(
                          'auth_modal.making_login',
                        )}  https://github.com/juniorklawa/strackify-terms/blob/main/TERMS_OF_USE.md ${translate(
                          'auth_modal.and',
                        )} https://github.com/juniorklawa/strackify-terms/blob/main/PRIVACY_POLICY.md
                
                        `}
                      </TermsText>
                    </Hyperlink>
                  </TermsContainer>
                </>
              )}
            </Formik>
          ) : (
            <>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                  confirmPassword: '',
                  username: '',
                }}
                validationSchema={signUpValidationSchema}
                onSubmit={handleCreateUser}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  isValid,
                  resetForm,
                }) => (
                  <>
                    <CoverContainer>
                      <HeaderImage
                        resizeMode="contain"
                        source={require('../../assets/cover.png')}
                      />
                    </CoverContainer>

                    <Title>Username</Title>

                    <Input
                      placeholder="Ex: johndoe"
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                    />

                    {errors.username && touched.username && (
                      <ErrorText>{errors.username}</ErrorText>
                    )}

                    <Title>E-mail</Title>

                    <Input
                      placeholder="Ex: johndoe@gmail.com"
                      onChangeText={handleChange('email')}
                      onBlur={() => {
                        handleBlur('email');
                      }}
                      value={values.email}
                      keyboardType="email-address"
                    />
                    {errors.email && touched.email && (
                      <ErrorText>{errors.email}</ErrorText>
                    )}

                    <Title>{translate('auth_modal.password')}</Title>

                    <Input
                      placeholder="Ex: johndoe123"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry
                    />

                    {errors.password && touched.password && (
                      <ErrorText>{errors.password}</ErrorText>
                    )}

                    <Title>{translate('auth_modal.confirm_password')}</Title>

                    <Input
                      placeholder="Ex: johndoe123"
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      secureTextEntry
                    />

                    {errors.confirmPassword && touched.confirmPassword && (
                      <ErrorText>{errors.confirmPassword}</ErrorText>
                    )}

                    <SignInButton
                      disabled={isLoading || !isValid}
                      onPress={handleSubmit}>
                      {!isLoading ? (
                        <SignInText>
                          {translate('auth_modal.create')}
                        </SignInText>
                      ) : (
                        <ActivityIndicator size="large" color="#43cfc3" />
                      )}
                    </SignInButton>

                    <BottomInfoContainer>
                      <QuestionText>
                        {translate('auth_modal.already_have_account')}
                      </QuestionText>
                      <TouchableOpacity
                        onPress={() => handleIsLogging(resetForm)}>
                        <QuestionActionText>
                          {translate('auth_modal.login')}
                        </QuestionActionText>
                      </TouchableOpacity>
                    </BottomInfoContainer>

                    <TermsContainer>
                      <Hyperlink
                        linkStyle={styles.linkStyle}
                        onPress={(url) => Linking.openURL(url)}
                        linkText={(url) =>
                          url ===
                          'https://github.com/juniorklawa/strackify-terms/blob/main/TERMS_OF_USE.md'
                            ? translate('auth_modal.terms_of_use')
                            : url ===
                              'https://github.com/juniorklawa/strackify-terms/blob/main/PRIVACY_POLICY.md'
                            ? translate('auth_modal.privacy_policy')
                            : url
                        }>
                        <TermsText>
                          {`${translate(
                            'auth_modal.making_login',
                          )}  https://github.com/juniorklawa/strackify-terms/blob/main/TERMS_OF_USE.md ${translate(
                            'auth_modal.and',
                          )} https://github.com/juniorklawa/strackify-terms/blob/main/PRIVACY_POLICY.md
                
                        `}
                        </TermsText>
                      </Hyperlink>
                    </TermsContainer>
                  </>
                )}
              </Formik>
            </>
          )}
        </BackDropContainer>
      </Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  linkStyle: {
    color: '#43cfc3',
    fontSize: 14,
    fontFamily: 'OpenSans-Light',
  },
});

export default AuthModal;
