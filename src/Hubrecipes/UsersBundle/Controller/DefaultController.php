<?php

namespace Hubrecipes\UsersBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('HubRecipesFrontEndBundle:Default:profile.html.twig', array('name' => $name));
    }
}
