export default function Badge({ image, size }) {
    return (
        <div className={`inline-block rounded-full ${size ? `h-${size} w-${size}` : `h-10 w-10`}`}>
            <img src={image} alt="Circular Badge" className="rounded-full h-full w-full object-cover" />
        </div>
    );
}