import { IPipe } from 'bonfire-rest/services/pipe/pipe.interface';
import { IFunctionParamMeta } from 'bonfire-rest';

export class AddDatePipe implements IPipe {
    pipe(value: any, paramOptions?: IFunctionParamMeta): any {
        value['date'] = new Date();
        return value;
    }
}
