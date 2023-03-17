import { APP_INTEGRATION_URL, APP_MANAGEMENT_URL } from 'consts/apiUrl';
import { App, AppIntegration } from 'interfaces/apps';
import { PromiseResponseBase, RequestPagingCommon } from 'interfaces/common';
import httpService from './httpService';

interface ResponseListApp {
  totalCount: number;
  items: App[];
}

export type RequestCreateApp = Omit<
  AppIntegration,
  'id' | 'ownerUserId' | 'developerName' | 'developerDescription' | 'isApproved'
>;

class AppManagementService {
  getListApp({ skip, take, filter }: RequestPagingCommon): PromiseResponseBase<ResponseListApp> {
    return httpService.get(
      `${APP_MANAGEMENT_URL}/application-listing?filter=${filter}&skip=${skip}&take=${take}`
    );
  }

  getInstalledListApp({
    skip,
    take,
    filter,
  }: RequestPagingCommon): PromiseResponseBase<ResponseListApp> {
    return httpService.get(
      `${APP_MANAGEMENT_URL}/installed-application-listing?filter=${filter}&skip=${skip}&take=${take}`
    );
  }

  installApp({ id }: { id: string }) {
    return httpService.post(`${APP_MANAGEMENT_URL}/install`, { id });
  }

  uninstallApp({ id }: { id: string }) {
    return httpService.post(`${APP_MANAGEMENT_URL}/uninstall`, { id });
  }

  getAppIntegration({ id }: { id: string }): PromiseResponseBase<AppIntegration> {
    return httpService.get(`${APP_INTEGRATION_URL}?id=${id}`);
  }

  createApp(body: RequestCreateApp) {
    return httpService.post(`${APP_INTEGRATION_URL}/create`, body);
  }

  updateApp(id: string, body: RequestCreateApp) {
    return httpService.put(`${APP_INTEGRATION_URL}/update?Id=${id}`, body);
  }
}

export default new AppManagementService();
