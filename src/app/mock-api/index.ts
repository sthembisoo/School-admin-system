import { AuthMockApi } from 'app/mock-api/common/auth/api';
import { IconsMockApi } from 'app/mock-api/ui/icons/api';
import { NavigationMockApi } from 'app/mock-api/common/navigation/api';
import { NotificationsMockApi } from 'app/mock-api/common/notifications/api';
import { ShortcutsMockApi } from 'app/mock-api/common/shortcuts/api';
import { UserMockApi } from 'app/mock-api/common/user/api';
import { CalendarMockApi } from './common/calendar/api';

export const mockApiServices = [
    AuthMockApi,
    IconsMockApi,
    NavigationMockApi,
    CalendarMockApi,
    NotificationsMockApi,
    ShortcutsMockApi,
    UserMockApi
];
