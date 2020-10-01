import { ObjectID } from 'mongodb';

export { ObjectID } from 'mongodb';

export class MongoHelper {
    public static toObjectId(id?: string | ObjectID) {
        return id ? new ObjectID(id) : null;
    }

    public static toHexString(id?: string | ObjectID): string {
        return id ? MongoHelper.toObjectId(id).toHexString() : null;
    }

    public static idsAreEqual(a?: string | ObjectID, b?: string | ObjectID): boolean {
        // Returns null if one or the other is null but not if both are.
        // ? Do we need this check?
        if ((a && !b) || (!a && b)) return null;

        return new ObjectID(a).equals(b);
    }

    public static toDateOnlyISOString = (date: string | Date) => new Date(date).toISOString().split('T', 1)[0];

    //Sanitize user input for use in mongoDB $regex queries.
    public static sanitizeRegexInput(userInput: string) {

        //regex to sanitize user input - escapes special characters (.* to \.\*)
        const regexSanitize = /([.*+?=^!:${}()|[\]\/\\])/g;
        const sanitizedString = String(userInput).replace(regexSanitize, '\\$1');

        return sanitizedString;
    }
}
