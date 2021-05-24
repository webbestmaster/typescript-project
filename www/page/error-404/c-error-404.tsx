import {Spinner} from '../../layout/spinner/c-spinner';
import {IsRender} from '../../layout/is-render/c-is-render';
import {IsHidden} from '../../layout/is-hidden/c-is-hidden';
import {Empty} from '../../layout/empty/c-empty';

export function Error404(): JSX.Element {
    return (
        <div>
            <h1>Page 404</h1>

            <IsRender isRender={false}>
                <IsHidden isHidden={false}>
                    <div>
                        <Empty />

                        <Spinner position="static" />
                    </div>
                </IsHidden>
            </IsRender>
        </div>
    );
}
