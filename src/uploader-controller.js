import { current, valueOf } from 'microstates';

const URL = 'https://api.frontside.io/v1/dev/null';

/**
 * When modelling side-effects, you generally listen to the output of a
 * `Store`, and then conditionally trigger state transitions based on
 * some sequence of events. The references that the store generates
 * are "smart" in the sense that they really represent a "path" into
 * the central datastructure of the store. In that way, the same
 * reference, can be used again and again and never become stale,
 *
 * For example:
 * ```
 * let bool = Store(create(Boolean, false));
 * bool.toggle();
 * bool.toggle();
 * bool.toggle();
 * ```
 * Will actually work, because every transition knows to operate not
 * on a value contained in the `bool` object, but rather on the value
 * at the same path within the store.
 *
 * This is great, because whether `true` or `false`, the reference is
 * of type `BooleanType` and so the toggle method will be present
 * since it lives on the prototype.
 *
 * However, this doesn't work so great when you're using a Union type
 * to represent a state machine. The reason is that the union type is
 * always one of N discreet types. For example, let's take an `Either`'
 * class and put it into a store instead of a Boolean.
 * `Either` type:
 *
 * ```
 * function Either(A, B) {
 *   return Union({
 *     Left: Either => class extends Either {
 *       value = A; // value of Left is of type A
 *     },
 *     Right: Either => class extends Either {
 *       value = B; // valuoe of Right is of type B
 *     }
 *   });
 * }
 *
 * const { Left, Right } = Either(String, Number);
 * let either = Store(Left.create('five'));
 * either instanceof Left //=> true
 * either.toRight(5) //=> internally the value is {type: 'Right', value: 5}
 * // but the problem is that `either` is still of type `Left`
 * either.value.increment() //> TypeError: "increment" is not a function.
 * ```
 *
 * If we were to listen to the value that is emitted from the store,
 * it would be of the proper type (Right). The problem is that we
 * don't have the luxury of listening directly to the callback to get
 * the freshest copy especially when we're drilled into the tree and
 * we're handing an object over to some controll code. Kinda like we
 * do in this upload controller.
 *
 */

export default function UploaderController(uploader) {
  for (let upload of uploader.uploads) {
    if (upload.isNew) {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', URL);
      xhr.onload = () => current(upload).finish(xhr)
      xhr.upload.onprogress = ({ lengthComputable, loaded, total }) => {
        current(upload).progress({ lengthComputable, loaded, total });
      };
      xhr.onabort = () => current(upload).abort(xhr);
      xhr.send(upload.file);
      upload.start()
    }
  }
}

/**
 *  What do we do? How do we keep the references fresh!
 */


 // *
 // * - Proxy magic.
 // * - over() a reference
 // * - return new proxy.
 // * -   what if we want to reach higher?
 // * - some side of callback
 // * - one transition per "thingy".
 // * - how is it affected by composition. e.g. I want to have a
