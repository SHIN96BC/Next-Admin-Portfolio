'use client'

/* eslint-disable */
import { ReactNode, useEffect, useState } from 'react';

// third-party
import { IntlProvider, MessageFormatElement } from 'react-intl';

// project import
import useConfig from '@Src/hooks/useConfig';
import { I18n } from '@Src/types/config';
import locales from '@Src/utils/locales';

// load locales files
const loadLocaleData = (locale: I18n) => {
  switch (locale) {
    case 'en':
      return import('@Src/utils/locales/en.json');
    case 'ko':
      return import('@Src/utils/locales/ko.json');
    default:
      return import('@Src/utils/locales/en.json');
  }
};

// ==============================|| LOCALIZATION ||============================== //

interface Props {
  children: ReactNode;
}

const Locales = ({ children }: Props) => {
  const { i18n } = useConfig();

  const [messages, setMessages] = useState<Record<string, string> | Record<string, MessageFormatElement[]> | undefined>();

  function flattenMessages(nestedMessages: any, prefix = '') {
    return Object.keys(nestedMessages).reduce((messages, key) => {
      const msg: any = messages;
      const value = nestedMessages[key];
      const prefixedKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'string') {
        msg[prefixedKey] = value;
      } else {
        Object.assign(msg, flattenMessages(value, prefixedKey));
      }
      return msg;
    }, {});
  }

  // useEffect(() => {
  //   loadLocaleData(i18n).then((d: { default: Record<string, string> | Record<string, MessageFormatElement[]> | undefined }) => {
  //     setMessages(d.default);
  //   });
  // }, [i18n]);

  return (
    <>
       {/*<IntlProvider locale={i18n} defaultLocale="en" messages={messages}>*/}
      <IntlProvider locale={i18n} defaultLocale="en" messages={flattenMessages(locales[i18n])}>
        {children as React.ReactElement}
      </IntlProvider>

      {/*{messages && (*/}
      {/*  <IntlProvider locale={i18n} defaultLocale="en" messages={messages}>*/}
      {/*    {children as React.ReactElement}*/}
      {/*  </IntlProvider>*/}
      {/*)}*/}
    </>
  );
};

export default Locales;
