<?php
'EmailTransport' => [
    'de'
]




   $to = "emeline.delobel@socgen.com";
   $subject = "test";

   message = 'Coucou';

   $headers = "MIME-Version: 1.0" . "\r\n";
   $headers = "Content-type:text/html;charset=UTF-8" . "\r\n";
   $headers = "From no-replay@exemple.com" . "\r\n" . "Reply-To: emeline.delobel@socgen.com" . "\r\n" . "X-Mailer: PHP/" . phpversion();

   mail($to, $subject, $message, $headers);
?>