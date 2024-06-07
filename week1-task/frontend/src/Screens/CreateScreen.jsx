import { useState } from "react"
import { Container } from "react-bootstrap"
import axios from "axios"
import { useNavigate } from "react-router-dom";
function CreateScreen() {

    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const navigate = useNavigate();

    const createQuote = async () => {
        try {
            const res = await axios.post("https://techplement-backend.vercel.app/create-quote", { quote, author });
            window.alert('New Quote Created');
            navigate("/")
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <Container>
            <div className="inner">
                <h1 className="text-white">Create Quote : </h1> <br />
                <form>
                    <textarea name="quote" rows="10" cols="500" value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="Write Quote Here" className="form-control"
                        required>
                    </textarea> <br /><br />
                    <input type="text" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author Name" className="form-control" required />
                    <button className="button1" onClick={createQuote} type="submit" id="newQ">Create</button>
                </form>
            </div>
        </Container>
    )
}

export default CreateScreen;