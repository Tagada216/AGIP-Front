<?php
    /*$to = 'lucie-varlet@hotmail.fr';
    $subject='Test envoie mail';

    $message="
    <html>
        <p>
            <h1>Description</h1>
        </p>
        <p>
            <h1>Enseigne(s) impactée(s)</h1>
        </p>
        <p>
            <h1>Impacts</h1>
        </p>
        <p>
            <h1>Causes</h1>
        </p>
        <p>
            <h1>Actions de résolution menées</h1>
        </p>
        <p>
            <h1>Plan d'action</h1>
        </p>
        <p>
            <h1>Prochaine communication à</h1>
        </p>
        <p>
            Tour De Contrôle<br>
            ITIM/GSI/TDC<br>
            Heures Ouvrées : 01-42-14-22-23<br>
            Astreinte de crise : 06-09-79-20-35
        </p>
    </html>
    ";

    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=iso-8859-1';

    mail($to,$subject,$message,implode("\r\n", $headers));*/
    $email="lucie.varlet@socgen.com";
    $message="Test";
    mail("lucie.varlet@socgen.com", "This is an email from:" .$email, $message);
?>