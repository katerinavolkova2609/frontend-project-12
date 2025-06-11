import * as Yup from 'yup';

const getSchema = (namesOfChannels, t) => Yup.object().shape({
    channel: Yup.string()
      .min(3, t('validation.min_max'))
      .notOneOf(namesOfChannels, t('validation.uniqChannelName'))
      .required(t('validation.requiredChannelName')),
  });

  export default getSchema;