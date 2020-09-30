export default class UrlController_CLS {
  static getUrlParams(args = { paramList: [], addPage: false }) {
    const { paramList, addPage } = args;

    if (!Array.isArray(paramList)) return "";

    const urlParams = new URLSearchParams(window.location.search);
    var response = "?";

    if (addPage) response += `page=${getPage()}`;

    for (var urlParamItem of paramList) {
      let urlParamKey = null;
      let urlParamResponseKey = null;
      let urlParamValue = null;

      if (!Array.isArray(urlParamItem)) {
        urlParamKey = urlParamItem;
        urlParamResponseKey = urlParamItem;
      } else {
        urlParamKey = urlParamItem[0];
        urlParamResponseKey = urlParamItem[1];
      }

      urlParamValue = urlParams.get(urlParamKey);

      if (urlParamValue) {
        response += `${urlParamResponseKey}=${urlParamValue}`;
      }
    }

    return response == "?" ? "" : response;
  }

  static getUrlParamsValues() {
    const urlParamsResponse = {};
    const urlParams = new URLSearchParams(window.location.search);

    window.location.search
      .substring(1)
      .split("&")
      .forEach((param) => (urlParamsResponse[param.split("=")[0]] = null));

    for (const key in urlParamsResponse) {
      if (key == "") continue;
      // urlParamsResponse[key] = urlParams.get(key);
    }

    return urlParamsResponse;
  }

  static getPage() {
    const urlParams = new URLSearchParams(window.location.search);
    return `${parseInt(urlParams.get("page") || 1) - 1}`;
  }
}

export const getUrlParams = UrlController_CLS.getUrlParams;
export const getPage = UrlController_CLS.getPage;
export const getUrlParamsValues = UrlController_CLS.getUrlParamsValues;
