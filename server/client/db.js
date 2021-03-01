import { firebaseAdmin } from './firebase';

export const db = firebaseAdmin.firestore();
db.settings({ ignoreUndefinedProperties: true });
