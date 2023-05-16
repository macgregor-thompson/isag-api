import { ObjectId } from 'mongodb';

export class MongoHelper {
    public static toObjectId(id?: string | ObjectId) {
        return id ? new ObjectId(id) : null;
    }

    public static toHexString(id?: string | ObjectId): string {
        return id ? MongoHelper.toObjectId(id).toHexString() : null;
    }

    public static idsAreEqual(a?: string | ObjectId, b?: string | ObjectId): boolean {
        // Returns null if one or the other is null but not if both are.
        // ? Do we need this check?
        if ((a && !b) || (!a && b)) return null;

        return new ObjectId(a).equals(b);
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
