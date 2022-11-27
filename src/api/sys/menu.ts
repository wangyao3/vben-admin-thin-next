import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/getMenuList',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  const ret = defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });

  return ret;
};
